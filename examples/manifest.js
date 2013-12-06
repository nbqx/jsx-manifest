{
  header: [
    "#target InDesign-7.0",
    "#targetengine session"
  ],
  src: [
    "a/a.jsx",
    "b/b.jsx",
    "c.jsx",
    "d/e/e.jsx"
  ],
  preProcess: {
    "b/b.jsx": function(body,opt){
      var content = opt['b'];
      body = body.replace(/(\/\* @options\{\{ \*\/)(.|\n|\r|\u2028|\u2029)+(\/\* \}\}@options \*\/)/g, content);
      return body
    },
    "c.jsx": function(body,opt){
      var content = "var DefaultPaths = "+JSON.stringify(opt['c'])+";";
      body = body.replace(/(\/\* @options\{\{ \*\/)(.|\n|\r|\u2028|\u2029)+(\/\* \}\}@options \*\/)/g, content);
      return body
    }
  }
}
