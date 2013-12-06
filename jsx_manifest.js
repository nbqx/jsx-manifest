var through = require('through'),
    fs = require('fs'),
    path = require('path'),
    vm = require('vm'),
    EventEmitter = require('events').EventEmitter;

// remove `#target...`, `#include...` in jsx file
function removeSharpedLine(body){
  return body.replace(/#[target|include].*\n/g,'');
};

module.exports = function(mpath, locals){
  var ev = new EventEmitter;
  var base_dir = path.dirname(mpath);
  
  // evaluate in sandbox
  var man_src = '('+fs.readFileSync(mpath)+')';
  var conf = vm.createScript(man_src).runInNewContext({});

  // config in manifest.[js|jsx]
  var headers = conf.header;
  var src_paths = conf.src;
  var filters = conf.preProcess;

  // built script data stream
  var stream = through(function write(data){
    // add header line
    if(this.buf===undefined) this.buf = headers.join("\n");
    this.buf = this.buf + data.toString();
  },function end(){
    ev.emit('build',this.buf);
    this.queue(null);
  });

  var jsx_streams = src_paths.forEach(function(x){
    var src = path.resolve(base_dir,x);

    // adapt to all jsx files
    var tf = through(function(data){
      var t = removeSharpedLine(data.toString());
      this.queue(t);
    }, function end(){
      this.queue(null);
    });
    
    if(filters !== undefined && filters.hasOwnProperty(x)){
      // preProcess func
      var th = through(function write(data){
        var filtered = filters[x](data.toString(), locals);
        this.queue(filtered+'');
      },function end(){
        this.queue(null);
      });
      fs.createReadStream(src).pipe(tf).pipe(th).pipe(stream);
    }else{
      fs.createReadStream(src).pipe(tf).pipe(stream);
    }
  });
  
  return ev
};
