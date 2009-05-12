// this is the default action name, in case no action was specified
jQuery.golf.defaultRoute = "search";

var main;

// this defines the golf controller
jQuery.golf.controller = {

  "^search/((.*)/)?$": function(b, match) {
    if (!main)
      b.append(main = new Component.com.example.main());
    main.load(match[2]);
    return false;
  },

  // the default action
  ".*": function(b, match) {
    jQuery.history.load("search/"+match[0]);
  }

};
