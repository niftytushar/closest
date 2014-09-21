_ajaxError = (jqXHR, textStatus, errorThrown) ->
	console.log "AJAX Error: #{errorThrown}"

mapOptions =
	center: new google.maps.LatLng(20.592616, 78.962860)
	zoom: 4
	disableDoubleClickZoom: true

# The global map object
map = new google.maps.Map document.getElementById("map-canvas"), mapOptions

# Contains all markers - destination and all drop off points
markers =
	destination: null
	dropOff: []

createMarker = (options) ->
	markerOptions =
		draggable: true
		map: map
		position: options.latLng

	# Create a marker
	marker = new google.maps.Marker markerOptions

	google.maps.event.addListener marker, "dragend", () ->
		console.log "Marker was moved."

	# Return marker object for further use
	marker

removeAllMarkers = () ->
	# Remove destination marker
	markers.destination.setMap null

	# Remove drop off location markers
	for marker in markers.dropOff
		marker.setMap null

# Map double click handler
_onMapDblClick = (ev) ->
	###
		A marker should always be added
		If destination is already set, add the location as drop off location
	###

	# Check destination marker
	ev.isDestination = true if not markers.destination

	# Check drop-off locations marker
	markers.dropOff[ev.position].setMap(null) if ev.position isnt null and typeof ev.position isnt "undefined" and markers.dropOff[ev.position]?

	# Attempt to create a marker
	marker = createMarker ev

	# Save this marker for future use
	if ev.isDestination then markers.destination = marker
	else
		if ev.position then markers.dropOff[ev.position] = marker
		else markers.dropOff.push marker
	
google.maps.event.addListener map, "dblclick", _onMapDblClick

# Attach Google Places Autocomplete to destination
autocomplete = new google.maps.places.Autocomplete document.getElementById("destination")
# Type 1 autocomplete indicates destination
autocomplete._type = 1

# Handle place change
_onPlaceChanged = () ->
	place = this.getPlace()

	if place.geometry
		map.panTo place.geometry.location
		map.setZoom 15

		# Do some search / marker adding here
		_onMapDblClick { 'latLng': place.geometry.location, 'isDestination': (if (this._type is 1) then true else false), 'position': this._position }
	else
		# Wanna do something else here? Go ahead.

	""

# Register place changed / selected handler
google.maps.event.addListener autocomplete, 'place_changed', _onPlaceChanged

# Add a drop off location box
addDropOff = (ev) ->
	ev && ev.preventDefault()

	$dropOff = $(".__t_drop-offs").append """
		<div class="input-group">
	        <input type="text" class="form-control" placeholder="Start typing your location..." />
	        <span class="input-group-btn">
	            <button class="btn btn-default btn-map-trigger" type="button" title="Use my current location"><i class="fa fa-map-marker"></i></button>
	        </span>
	    </div><!-- /input-group -->
	    """
	# Attach Google Places Autocomplete to drop off
	_autocomplete = new google.maps.places.Autocomplete $dropOff.find("input[type='text']:last")[0]
	# Type 2 autocomplete indicates drop off location
	_autocomplete._type = 2
	# Save position of input to bind with autocomplete
	_autocomplete._position = $dropOff.find("input[type='text']:last").index()

	# Register place changed / selected handler
	google.maps.event.addListener _autocomplete, 'place_changed', _onPlaceChanged

	""

# Add first drop off location box
addDropOff()

# Handle add more drop off locations
$("#addDropOff").on "click", addDropOff

_displayRoute = (result, status) ->
	directionsRendererOptns =
		'directions': result
		'hideRouteList': true
		'map': map

	directionsRenderer = new google.maps.DirectionsRenderer directionsRendererOptns


_distanceCalculated = (response, status) ->
	# TODO: Handle status and display appropriate message

	rows = response.rows
	closest =
		'distance':
			'value': Infinity

	for row, i in rows
		row.elements[0].index = i
		if row.elements[0].distance.value < closest.distance.value then closest = row.elements[0]

	closest.location =
		text: $(".__t_drop-offs").find("input[type='text']:eq(#{closest.index})").val()

	# Display result text
	$("#result").html "Your closest drop off is <strong>#{closest.location.text}</strong>, #{closest.distance.text} away."

	# Map cleanup
	removeAllMarkers()

	# Display directions to location
	directionsService = new google.maps.DirectionsService()

	directionsRequestOptns =
		'destination': markers.destination.getPosition()
		'origin': markers.dropOff[closest.index].getPosition()
		'travelMode': google.maps.TravelMode.DRIVING

	directionsService.route directionsRequestOptns, _displayRoute

findClosest = (ev) ->
	ev.preventDefault()

	distancematrix = new google.maps.DistanceMatrixService()

	# Get latitude, longitude of destination
	destination = markers.destination.getPosition()

	# Get latitude, longitude of all drop off locations
	origins = []
	for origin in markers.dropOff
		origins.push origin.getPosition().lat() + "," + origin.getPosition().lng()

	requestParams =
		'travelMode': google.maps.TravelMode.DRIVING
		'origins': origins
		'destinations': [destination]

	# Get distance to destination from all drop off locations
	distancematrix.getDistanceMatrix requestParams, _distanceCalculated

# Handle click on Find Closest button
$("#findClosestForm").on "submit", findClosest