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
var tmpLat = 28.2
var tmpLng = 83.98166700000002;
var marker_icon = {url: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=N|F7584C|000000"};

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        //center: {lat: 28.2, lng: 83.98166700000002 }
        center: {lat: tmpLat, lng: tmpLng}
    });
    var geocoder = new google.maps.Geocoder();

    // Initial pre-population the marker on the map
    var pre_load = 1; // This is a pre-population of marker on the map status.
    geocodeAddress(geocoder, pre_load);

    // Do the map work once
    document.getElementById('locate_on_map').addEventListener('click', function() {
        pre_load = 0;
        geocodeAddress(geocoder, pre_load);
    });
}

/**
 * Function to manipulate the Google Map Locator
 * @param geocoder object This is a geocoder object
 */
function geocodeAddress(geocoder, pre_load) {
    address = document.getElementById('address').value;
    postcode = document.getElementById('postcode').value;
    var fullAddress = address + ' ' + postcode;

    geocoder.geocode({'address': fullAddress}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var result = results[0].geometry.location;
            locateAddressMarker(result, pre_load);
        } else {
            if (pre_load == false) {
            alert('Geocode was not successful for the following reason: ' + status);
        }
        }
    });
}

/**
 * @param result This is the object return by google api after the passing the address via api param.
 */
function locateAddressMarker(result, pre_load)
{
    // Fetching the keys from result object;
    var geo_keys = Object.keys(result);
    var result_lat_key = geo_keys[0];
    var result_lng_key = geo_keys[1];
    // console.log(geo_keys);

    // If older value exist, override the existing one;
    if (pre_load == 1) {
        //Google Parameter changed: Lat: G; Lng: K;
        result[result_lat_key] = tmpLat;
        result[result_lng_key] = tmpLng;
    }
    //console.log( 'pre_load: '+pre_load+' tmpLat1: ' + result[result_lat_key] + ' tmpLng1: '+ result[result_lng_key]);

    // After searching the address, set the resulted latitude/longitude values into the text fields.
    document.getElementById('latitude').value = lat = result[result_lat_key]; // Set the latitude value
    document.getElementById('longitude').value = lng = result[result_lng_key]; // Set the longitude value

    // Set Marker Character and Color;
    var marker_icon = {url: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=N|F7584C|000000"};

    // Marker Address Information Variable
    fullAddress = postcode;
    if (address != "") {
        addressTmp = address.replace(/,/g , "<br>");
        fullAddress = addressTmp + ' ' + fullAddress;
    }
    var contentString = fullAddress;

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


/** TODO: The below functions is for multiple marker in the google map. */
function LoadMultiAddressOnGoogleMap(markers) {
    var mapOptions = {
        //center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
        center: {lat: tmpLat, lng: tmpLng},
        //center: {lat: 53.282872, lng: -3.8294799999999896},
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    //Create and open InfoWindow.
    var infoWindow = new google.maps.InfoWindow();

    for (var i = 0; i < markers.length; i++) {
        var data = markers[i];
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);

        var colortype = {green:"73C319", red:"F7584C"};
        marker_icon = {url: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=A|" + colortype[data.type]+ "|000000"};

        var marker = new google.maps.Marker({
            map: map,
            position: myLatlng,
            //animation: google.maps.Animation.DROP,
            icon: marker_icon
        });

        //Attach click event to the marker.
        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                infoWindow.setContent("<div style = 'min-width:150px;max-width:250px;min-height:40px;color:#214D74'><b>" +  data.title + "</b><br/>" + data.description + "</div>");
                infoWindow.open(map, marker);
            });
        })(marker, data);
    }
}
