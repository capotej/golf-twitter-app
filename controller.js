//$.golf.defaultRoute = "/test/";

$.golf.controller = [

  { route: ".*",
    action: function(b,match) {
      b.empty().append(new Component.Twitter());
    }
  }

];
