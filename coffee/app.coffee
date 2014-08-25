mapOptions =
	center: new google.maps.LatLng(-34.397, 150.644)
	zoom: 8
	disableDoubleClickZoom: true

map = new google.maps.Map document.getElementById("map-canvas"), mapOptions


markerOptions =
		draggable: true
		map: map

marker = new google.maps.Marker markerOptions

google.maps.event.addListener marker, "position_changed", () ->
		alert "Moved"

_mapDblClick = (ev) ->
	marker.setPosition ev.latLng
	
google.maps.event.addListener map, "dblclick", _mapDblClick