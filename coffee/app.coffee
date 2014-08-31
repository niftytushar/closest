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
_mapDblClick = (ev) ->
	# Check if a marker should added
		# Check destination marker
		# Check drop-off locations marker

	# Add a marker if required
	createMarker ev
	
google.maps.event.addListener map, "dblclick", _mapDblClick

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
addDropOff()

# Handle add more drop off locations
$("#addDropOff").on "click", addDropOff