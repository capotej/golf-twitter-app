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
    $.history.load("search/"+val+"/");
    return false;
  });

  $(".pix").append(flickr = new Component.com.example.flickr());
}
