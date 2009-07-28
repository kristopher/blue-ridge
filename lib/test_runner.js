if(arguments.length == 0) {
  print("Usage: test_runner.js spec/javascripts/file_spec.js");
  quit(1);
}

var PLUGIN_PREFIX = environment["blue.ridge.prefix"] || "../../vendor/plugins/blue-ridge";

var BlueRidge = {
  require: function(file, options){ 
    load(file); 
  
    options = options || {};
    if(options['onload']) {
      options['onload'].call();
    }
  },

  debug: function(message){
    print(message);
  },
  
  get fixtureFile(){
    return "fixtures/" + this.specFile.replace(/^(.*?)_spec\.js$/, "$1.html");
  }
};

BlueRidge.specFile = arguments[0];

var require = require || BlueRidge.require;
var debug   = debug   || BlueRidge.debug;

// Mock up the Firebug API for convenience.
var console = console || {debug: debug};

load(PLUGIN_PREFIX + "/lib/env.rhino.js");
window.location = BlueRidge.fixtureFile;

load(PLUGIN_PREFIX + "lib/screw/screw-unit.js");
load(PLUGIN_PREFIX + "lib/jquery/jquery-1.3.2.js");
load(PLUGIN_PREFIX + "lib/jquery/jquery.fn.js");
load(PLUGIN_PREFIX + "lib/jquery/jquery.print.js");
load(PLUGIN_PREFIX + "lib/smoke/smoke.core.js");
load(PLUGIN_PREFIX + "lib/smoke/smoke.mock.js");
load(PLUGIN_PREFIX + "lib/smoke/smoke.stub.js");
load(PLUGIN_PREFIX + "lib/screw/screw.mocking.js");
load(PLUGIN_PREFIX + "lib/consoleReportForRake.js");

print("Running " + BlueRidge.specFile + " with fixture '" + BlueRidge.fixtureFile + "'...");
load(BlueRidge.specFile);
jQuery(window).trigger("load");
