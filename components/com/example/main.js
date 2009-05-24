function() {
  var flickr;

  this.load = function(what) {
    flickr.load(what);
    $("input[name='what']").select().focus();
  };

  this.onAppend = function() {
    $("form").submit(function() {
      var val = encodeURIComponent($("[name='what']").val());
      $.golf.location("/search/"+val+"/");
      return false;
    });
  };

  $(".pix").append(flickr = new Component.com.example.flickr());
}
