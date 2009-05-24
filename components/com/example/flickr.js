function(argv) {
  // flickr.com api url
  var api_url = "http://api.flickr.com/services/feeds/photos_public.gne";

  this.load = function(tag) {
    // build the flickr.com jsonp url parameters
    var url = api_url+"?tags="+tag+"&tagmode=any&format=json&jsoncallback=?";

    $("table").removeClass("bordered");
    $("caption, .notfound").hide();

    // show the loading spinner while jsonp is loading
    $(".pic").attr("src", $.component.res["loading.gif"]);
    $(".pic").show();

    // make the jsonp request and swap the resulting image in
    $.getJSON(url, function(data) {
      $(".pic").hide();
      if (!data.items || data.items.length == 0) {
        // response with no data returned
        $(".notfound").show();
      } else {
        // response contains results
        var pic = data.items.pop();
        $(".title").hide();
        $(".pic").attr("src", pic.media.m).show();
        $("caption").text(pic.title).attr("style", "display:table-caption;");
        $("table").addClass("bordered");
      }
    });
  };
}
