(function() {
  var addDropOff, autocomplete, createMarker, findClosest, map, mapOptions, markers, removeAllMarkers, _ajaxError, _displayRoute, _distanceCalculated, _onMapDblClick, _onPlaceChanged;

  _ajaxError = function(jqXHR, textStatus, errorThrown) {
    return console.log("AJAX Error: " + errorThrown);
  };

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

  removeAllMarkers = function() {
    var marker, _i, _len, _ref, _results;
    markers.destination.setMap(null);
    _ref = markers.dropOff;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      marker = _ref[_i];
      _results.push(marker.setMap(null));
    }
    return _results;
  };

  _onMapDblClick = function(ev) {

    /*
    		A marker should always be added
    		If destination is already set, add the location as drop off location
     */
    var marker;
    if (!markers.destination) {
      ev.isDestination = true;
    }
    if (ev.position !== null && typeof ev.position !== "undefined" && (markers.dropOff[ev.position] != null)) {
      markers.dropOff[ev.position].setMap(null);
    }
    marker = createMarker(ev);
    if (ev.isDestination) {
      return markers.destination = marker;
    } else {
      if (ev.position) {
        return markers.dropOff[ev.position] = marker;
      } else {
        return markers.dropOff.push(marker);
      }
    }
  };

  google.maps.event.addListener(map, "dblclick", _onMapDblClick);

  autocomplete = new google.maps.places.Autocomplete(document.getElementById("destination"));

  autocomplete._type = 1;

  _onPlaceChanged = function() {
    var place;
    place = this.getPlace();
    if (place.geometry) {
      map.panTo(place.geometry.location);
      map.setZoom(15);
      _onMapDblClick({
        'latLng': place.geometry.location,
        'isDestination': (this._type === 1 ? true : false),
        'position': this._position
      });
    } else {

    }
    return "";
  };

  google.maps.event.addListener(autocomplete, 'place_changed', _onPlaceChanged);

  addDropOff = function(ev) {
    var $dropOff, _autocomplete;
    ev && ev.preventDefault();
    $dropOff = $(".__t_drop-offs").append("<div class=\"input-group\">\n	        <input type=\"text\" class=\"form-control\" placeholder=\"Start typing your location...\" />\n	        <span class=\"input-group-btn\">\n	            <button class=\"btn btn-default btn-map-trigger\" type=\"button\" title=\"Use my current location\"><i class=\"fa fa-map-marker\"></i></button>\n	        </span>\n	    </div><!-- /input-group -->");
    _autocomplete = new google.maps.places.Autocomplete($dropOff.find("input[type='text']:last")[0]);
    _autocomplete._type = 2;
    _autocomplete._position = $dropOff.find("input[type='text']:last").index();
    google.maps.event.addListener(_autocomplete, 'place_changed', _onPlaceChanged);
    return "";
  };

  addDropOff();

  $("#addDropOff").on("click", addDropOff);

  _displayRoute = function(result, status) {
    var directionsRenderer, directionsRendererOptns;
    directionsRendererOptns = {
      'directions': result,
      'hideRouteList': true,
      'map': map
    };
    return directionsRenderer = new google.maps.DirectionsRenderer(directionsRendererOptns);
  };

  _distanceCalculated = function(response, status) {
    var closest, directionsRequestOptns, directionsService, i, row, rows, _i, _len;
    rows = response.rows;
    closest = {
      'distance': {
        'value': Infinity
      }
    };
    for (i = _i = 0, _len = rows.length; _i < _len; i = ++_i) {
      row = rows[i];
      row.elements[0].index = i;
      if (row.elements[0].distance.value < closest.distance.value) {
        closest = row.elements[0];
      }
    }
    closest.location = {
      text: $(".__t_drop-offs").find("input[type='text']:eq(" + closest.index + ")").val()
    };
    $("#result").html("Your closest drop off is <strong>" + closest.location.text + "</strong>, " + closest.distance.text + " away.");
    removeAllMarkers();
    directionsService = new google.maps.DirectionsService();
    directionsRequestOptns = {
      'destination': markers.destination.getPosition(),
      'origin': markers.dropOff[closest.index].getPosition(),
      'travelMode': google.maps.TravelMode.DRIVING
    };
    return directionsService.route(directionsRequestOptns, _displayRoute);
  };

  findClosest = function(ev) {
    var destination, distancematrix, origin, origins, requestParams, _i, _len, _ref;
    ev.preventDefault();
    distancematrix = new google.maps.DistanceMatrixService();
    destination = markers.destination.getPosition();
    origins = [];
    _ref = markers.dropOff;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      origin = _ref[_i];
      origins.push(origin.getPosition().lat() + "," + origin.getPosition().lng());
    }
    requestParams = {
      'travelMode': google.maps.TravelMode.DRIVING,
      'origins': origins,
      'destinations': [destination]
    };
    return distancematrix.getDistanceMatrix(requestParams, _distanceCalculated);
  };

  $("#findClosestForm").on("submit", findClosest);

}).call(this);
