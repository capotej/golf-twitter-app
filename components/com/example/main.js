function() {

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

  var flickr = new Component.com.example.flickr();

  $(".pix").append(flickr);
}
