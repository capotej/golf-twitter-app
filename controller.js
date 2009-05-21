// this is the default action name, in case no action was specified
jQuery.golf.defaultRoute = "/search/golfers/";

// this defines the golf controller
jQuery.golf.controller = {

  "^/search/((.*)/)?$": (function() {
    var main;

    return function(b, match) {
      if (!main)
        b.append(main = new Component.com.example.main());
      main.load(match[2]);
      return false;
    };
  })(),

  // the default action
  ".*": function(b, match) {
    $.address.value("/search"+match[0]);
  }

};
