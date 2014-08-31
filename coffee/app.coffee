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

# Map double click handler
_onMapDblClick = (ev) ->
	# Check if a marker should added
		# Check destination marker
		# Check drop-off locations marker

	# Attempt to create a marker
	marker = createMarker ev

	# Save this marker for future use
	
google.maps.event.addListener map, "dblclick", _onMapDblClick

# Attach Google Places Autocomplete to destination
autocomplete = new google.maps.places.Autocomplete document.getElementById("destination")

# Handle place change
_onPlaceChanged = () ->
	place = autocomplete.getPlace()

	if place.geometry
		map.panTo place.geometry.location
		map.setZoom 15

		# Do some search / marker adding here
		_onMapDblClick { 'latLng': place.geometry.location }
	else
		# Wanna do something else here? Go ahead.

	""

# Register place changed / selected handler
google.maps.event.addListener autocomplete, 'place_changed', _onPlaceChanged

# Add a drop off location box
addDropOff = (ev) ->
	ev && ev.preventDefault()

	$(".__t_drop-offs").append """
		<div class="input-group">
	        <input type="text" class="form-control" placeholder="Start typing your location..." />
	        <span class="input-group-btn">
	            <button class="btn btn-default" type="button" title="Use my current location"><i class="fa fa-map-marker"></i></button>
	        </span>
	    </div><!-- /input-group -->
	    """
# Add first drop off location box
addDropOff()

# Handle add more drop off locations
$("#addDropOff").on "click", addDropOff