(function() {
  var addDropOff, autocomplete, createMarker, map, mapOptions, markers, _onMapDblClick, _onPlaceChanged;

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

  _onMapDblClick = function(ev) {
    var marker;
    return marker = createMarker(ev);
  };

  google.maps.event.addListener(map, "dblclick", _onMapDblClick);

  autocomplete = new google.maps.places.Autocomplete(document.getElementById("destination"));

  _onPlaceChanged = function() {
    var place;
    place = autocomplete.getPlace();
    if (place.geometry) {
      map.panTo(place.geometry.location);
      map.setZoom(15);
      _onMapDblClick({
        'latLng': place.geometry.location
      });
    } else {

    }
    return "";
  };

  google.maps.event.addListener(autocomplete, 'place_changed', _onPlaceChanged);

  addDropOff = function(ev) {
    ev && ev.preventDefault();
    return $(".__t_drop-offs").append("<div class=\"input-group\">\n	        <input type=\"text\" class=\"form-control\" placeholder=\"Start typing your location...\" />\n	        <span class=\"input-group-btn\">\n	            <button class=\"btn btn-default\" type=\"button\" title=\"Use my current location\"><i class=\"fa fa-map-marker\"></i></button>\n	        </span>\n	    </div><!-- /input-group -->");
  };

  addDropOff();

  $("#addDropOff").on("click", addDropOff);

}).call(this);
