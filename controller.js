// this is the default action name, in case no action was specified
$.golf.defaultRoute = "/search/golfers/";

// this defines the golf controller
$.golf.controller = {

  "^/search/((.*)/)?$": (function() {
    var main = new Component.com.example.main();

    return function(b, match) {
      if (!match[2])
        $.address.value($.golf.defaultRoute);
      b.empty().append(main)
      main.load(match[2]);
      return false;
    };
  })(),

  // the default action
  ".*": function(b, match) {
    $.address.value("/search"+match[0]);
  }

};
