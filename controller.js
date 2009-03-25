
// this is the default action name, in case no action was specified
jQuery.golf.defaultActionName = "search";

// this defines the golf controller
jQuery.golf.controller = {

  "^hello/(.*)$": function(b, match) {
    b.append("<h1>Hello, there!</h1>");
    b.append("<p>The arguments are: 1. '"+match[0]+"', 2. '"+match[1]+"'</p>");
  },

  "^search/((.*)/)?$": function(b, match) {
    var thing = match[2] || "golfers";
    b.append(new Component.com.example.main([thing]));
  },

  // the default action
  defaultAction: function(b, match) {
    var a = new Component.com.example.main(match);
    b.append(a);
  }

};
