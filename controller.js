//$.golf.defaultRoute = "/test/";

$.golf.controller = [

  { route: ".*",
    action: (function() {
      var twit;
      return function(b,match) {
        if (!twit) twit = new Component.Twitter();
        b.empty().append(twit);
      }
    })()
  }

];
