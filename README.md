## JSX(Adobe ExtendScript) Manifest

JSX(Adobe ExtendScript) pre-processor

## Install

    $ git clone https://github.com/nbqx/jsx-manifest.git
    $ cd jsx-manifest
    $ npm install -g .

## Usage

show help and examples

    $ jsx_manifest -h 

or

    $ git clone https://github.com/nbqx/jsx-manifest.git
    $ cd jsx-manifest
    $ npm install .

``` js

var jsx_manifest = require('jsx-manifest');
// `locals` is json object
jsx_manifest('/path/to/manifest.js', locals).on('build',function(data){
  // something to do
  // data is combined extendscript string data
});

```

## Manifest.js Sample

``` js
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
```

## Example

    $ node index.js examples/manifest.js -b examples/data.json -o build.jsx
    $ node index.js examples/manifest2.js -b examples/data.json -o build.jsx

