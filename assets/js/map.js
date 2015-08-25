/**
 * @package: google-map
 * @FileType: javascript
 * @author RC Adhikari <http://rcadhikari.blogspot.co.uk>
 * Date: 25/08/2015 15:35
 */

// Set as a global variable;
var marker;
var address;
var postcode;

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {lat: 28.216358639718297, lng: 83.94769437583 }
    });
    var geocoder = new google.maps.Geocoder();

    // Do the map work once
    document.getElementById('locate_on_map').addEventListener('click', function() {
        geocodeAddress(geocoder);
    });
}

/**
 * Function to manipulate the Google Map Locator
 * @param geocoder object This is a geocoder object
 */
function geocodeAddress(geocoder) {
    address = document.getElementById('address').value;
    postcode = document.getElementById('postcode').value;
    var fullAddress = address + ' ' + postcode;

    locateAddressMarker(result);

    geocoder.geocode({'address': fullAddress}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var result = results[0].geometry.location;
            locateAddressMarker(result);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

/**
 * @param result This is the object return by google api after the passing the address via api param.
 */
function locateAddressMarker(result)
{
    // After searching the address, set the resulted latitude/longitude values into the text fields.
    document.getElementById('latitude').value = lat = result.G; // Set the latitude value
    document.getElementById('longitude').value = lng = result.K; // Set the longitude value

    // Set Marker Character and Color;
    var marker_icon = {url: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=A|F7584C|000000"};
    // Marker Address Information Variable
    var contentString = address + ' ' + postcode;

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15, // increase the zoom
        center: {lat: lat, lng: lng}
    });
    // Set the Center;
    map.setCenter(result);
    marker = new google.maps.Marker({
        map: map,
        position: result,
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: marker_icon
    });
    marker.addListener('click', toggleBounce);

    // Adding the location info whilst clicking marker
    var infoWindow = new google.maps.InfoWindow({
        content: contentString
    });
    google.maps.event.addListener(marker, "click", function(event) {
        infoWindow.open(map, marker);
    });

    // When dragging the marker, update the the latitude/longitude values into the text fields.
    google.maps.event.addListener(marker, "dragend", function(event) {
        document.getElementById('latitude').value = event.latLng.lat();
        document.getElementById('longitude').value = event.latLng.lng();
    });
}

// Toggle the marker when clicked and bouncing until set timeout
function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);

        // Set the timeout for marker bouncing
        setTimeout(function(){ marker.setAnimation(null); }, 750);
    }
}