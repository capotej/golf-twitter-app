// this is the default action name, in case no action was specified
$.golf.defaultRoute = "/search/golfers/";

// this defines the golf controller
$.golf.controller = [

  // action for the /search/something/ routes
  { route:  "^/search/(([^/]+)/)+$",
    action: (function() {
      var main = new Component.com.example.main();

      return function(b, match) {
        b.empty().append(main)
        main.load(match[2]);
        return false;
      };
    })()
  },

  // the default action
  { route:  ".*",
    action: function(b, match) {
      $.golf.location($.golf.defaultRoute);
    }
  }

];
