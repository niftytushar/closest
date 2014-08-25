mapOptions =
	center: new google.maps.LatLng(-34.397, 150.644)
	zoom: 8
	disableDoubleClickZoom: true

map = new google.maps.Map document.getElementById("map-canvas"), mapOptions

_mapDblClick = () ->
	alert "Dbl Clicked"

addMarker = (options) ->
	markerOptions =
		position: options.LatLng
		draggable: true
		map: options.map || null

	google.maps.Marker markerOptions

google.maps.event.addListener map, "dblclick", _mapDblClick