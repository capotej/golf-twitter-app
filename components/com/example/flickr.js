function(argv) {
  // flickr.com api url
  var api_url = "http://api.flickr.com/services/feeds/photos_public.gne";

  this.load = function(tag) {
    // build the flickr.com jsonp url parameters
    var url = api_url+"?tags="+tag+"&tagmode=any&format=json&jsoncallback=?";

    // show the loading spinner while jsonp is loading
    $(".notfound").hide();
    $(".pic").attr("src", $.component.res["loading.gif"]);
    $(".pic").show();

    // make the jsonp request and swap the resulting image in
    $.getJSON(url, function(data) {
      if (!data.items || data.items.length == 0) {
        // response with no data returned
        $(".pic").hide();
        $(".notfound").fadeIn();
      } else {
        // response contains results
        $(".notfound").hide();
        $(".pic").attr("src", data.items.pop().media.m).fadeIn();
      }
    });
  };
}
