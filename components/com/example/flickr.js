function(argv) {
  var api_url = "http://api.flickr.com/services/feeds/photos_public.gne";

  this.load = function(tag) {
    var url = api_url;
    url += "?tags="+tag;
    url += "&tagmode=any";
    url += "&format=json";
    url += "&jsoncallback=?";

    var loading = $("<img/>").attr("src", $.component.res["loading.gif"]);
    $(".photos_go_here").empty().append(loading);

    $.getJSON(url, function(data) {
      if (!data.items || data.items.length == 0) {
        $(".photos_go_here").empty().append("<p>No images found.</p>");
      } else {
        $.each(data.items, function(i,item){
          if (i > 1)
            return false;
          var img = $("<img/>").attr("src", item.media.m);
          $(".photos_go_here").empty().append(img);
        });
      }
    });
  };
}
