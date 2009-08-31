(function($) {

function Client(backend) {

  this.id = (Math.random() + '').substring(2,14) +
    (new Date().getTime() + '').substring(8,13);

  this.connected = false;

  var client = this;
  var QQ = $.require("JSONQuery").JSONQuery;

  function Table(schema) {
    var cache=[], 
        queries={},
        table=this;

    this.schema   = schema;
    this.baseUri  = "/"+backend+"/"+schema.id+"/";

    this._cache = function() {
      return cache;
    };

    this._get = function(q, f, off, len) {
      var start=off||0,
          end=start+(len||0)-1,
          orig_q=q,
          orig_start=start,
          orig_end=end,
          result=[],
          start2,end2,i,l;

      if (end<start)
        return f([]);

      if (queries[q]) {
        for (i=0,l=queries[q].length; i<l; i++) {
          start2  = queries[q][i][0];
          end2    = queries[q][i][0];
          if (end < start2) {
            // cache miss
            break;
          } else if (start >= start2 && end <= end2) {
            // cache hit
            return f(QQ(orig_q, cache));
          } else if (
        }
      }

      $.ajax(
        {
          type: "get",
          url: table.baseUri+encodeURIComponent(q),
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Client-Id", client.id);
            xhr.setRequestHeader("Subscribe", "*");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Range", "items="+start+"-"+end);
          },
          dataType: "json",
          success: function(data) {
            var i,j,k,l,ll;
            for (i=0,l=data.length; i<l; i++) {
              for (j=0,ll=cache.length; j<ll; j++) {
                if (cache[j].id == data[i].id) {
                  for (k in cache[j])
                    delete cache[j][k];
                  for (k in data[i])
                    cache[j][k] = data[i][k];
                  break;
                }
              }
              if (j==ll)
                cache.push(data[i]);
            }
            if (!queries[q])
              queries[q] = [];
            queries[q].push([start, end]);
            queries[q] = queries[q].sort(
              function(a,b) {
                return a[0] - b[0];
              }
            );
            f(QQ(orig_q, cache));
          }
        }
      );
    };
  }

  function channel() {
    $.ajax(
      {
        type: "post",
        url: "/"+backend+"/channels",
        beforeSend: function(xhr) {
          var hdr = (client.connected ? "Create-" : "") + "Client-Id";
          xhr.setRequestHeader(hdr, client.id);
          xhr.setRequestHeader("Accept", "application/rest+json");
        },
        dataType: "json",
        success: function(data) {
          client.connected = true;
          console.log(data);
          channel();
        }
      }
    );
  }

  $.ajax(
    {
      type: "get",
      url: "/"+backend+"/Class/",
      async: false,
      dataType: "json",
      success: function(data) {
        $.each(
          data,
          function(k,v) {
            client[v.id] = new Table(v);
          }
        );
      }
    }
  );

  this.query = function(q, f) {
  };

}

if (!singleton.client)
  singleton.client = new Client("data");

exports.getInstance = function() { return singleton.client };

})(jQuery);
