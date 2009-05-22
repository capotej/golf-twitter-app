function() {
  var flickr;

  this.load = function(what) {
    what = !!what ? what : "golfers";
    $(".title").text("Look, it's "+what+"!");
    flickr.load(what);
    $("input[name='what']").select().focus();
  };

  $("form").submit(function() {
    var val = $("[name='what']").val();
    $.address.value("/search/"+val+"/");
    return false;
  });

  flickr = new Component.com.example.flickr();
  $(".pix").append(flickr);
}
