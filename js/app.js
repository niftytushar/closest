(function() {
  var addDropOff, createMarker, map, mapOptions, markers, _mapDblClick;

  mapOptions = {
    center: new google.maps.LatLng(20.592616, 78.962860),
    zoom: 4,
    disableDoubleClickZoom: true
  };

  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  markers = {
    destination: null,
    dropOff: []
  };

  createMarker = function(options) {
    var marker, markerOptions;
    markerOptions = {
      draggable: true,
      map: map,
      position: options.latLng
    };
    marker = new google.maps.Marker(markerOptions);
    google.maps.event.addListener(marker, "dragend", function() {
      return console.log("Marker was moved.");
    });
    return marker;
  };

  _mapDblClick = function(ev) {
    return createMarker(ev);
  };

  google.maps.event.addListener(map, "dblclick", _mapDblClick);

  addDropOff = function(ev) {
    ev && ev.preventDefault();
    return $(".__t_drop-offs").append("<div class=\"input-group\">\n        <input type=\"text\" class=\"form-control\" placeholder=\"Start typing your location...\" />\n        <span class=\"input-group-btn\">\n            <button class=\"btn btn-default\" type=\"button\" title=\"Use my current location\"><i class=\"fa fa-map-marker\"></i></button>\n        </span>\n    </div><!-- /input-group -->");
  };

  addDropOff();

  $("#addDropOff").on("click", addDropOff);

}).call(this);
