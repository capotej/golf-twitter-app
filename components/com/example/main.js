
function(argv) {
  var self = this;
  var flickr = new Component.com.example.flickr();

  this.load = function(tag) {
    $(".title").text("Look, it's "+tag+"!");
    flickr.load(tag);
  };

  $("form").submit(function() {
      //self.load($("[name='what']").val());
      $.golf.onHistoryChange("search/"+$("[name='what']").val()+"/");
      return false;
  });

  if (argv.length == 0) argv = ["golf"];
  $(".pix").append(flickr);

  this.load(argv[0]);
}
