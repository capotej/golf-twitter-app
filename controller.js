//$.golf.defaultRoute = "/test/";

$.golf.controller = [

  { route: ".*",
    action: (function() {
      var twit;
      return function(container, params) {
        if (!twit) twit = new Component.Twitter();
        container.empty().append(twit);
      }
    })()
  }

];
