## JS(Adobe ExtendScript) Manifest

JS(Adobe ExtendScript) pre-processor

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

## Example

    $ node index.js examples/manifest.js -b examples/data.json -o build.jsx
    $ node index.js examples/manifest2.js -b examples/data.json -o build.jsx

