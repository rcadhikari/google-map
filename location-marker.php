<?php
/**
 * @package: google-map
 * @FileType: PHP Script
 * @author RC Adhikari <http://rcadhikari.blogspot.co.uk>
 * Date: 25/08/2015 15:20
 */

?>
<div class="container">
    <?php require_once 'header.php'; ?>

    <div class="control-group">
        <div class="control-label">
            <label>
                Address:<span class="required">&nbsp;*</span></small>
            </label>
        </div>
        <div class="controls">
            <textarea id="address" name="address" value="" size="30" required="required">Pokhara Airport, Nagdhunga, Pokhara, Nepal</textarea>
        </div>
    </div>
    
    <div class="control-group">
        <div class="control-label">
            <label>
                Postcode:<span class="required">&nbsp;*</span>
            </label>
        </div>
        <div class="controls">
            <input type="text" id="postcode" name="postcode" value="33700" size="30" required="required">
            <button type="button" class="btn btn-small btn-primary validate" id="locate_on_map" onclick="">Find</button>
        </div>
        <br/>
    </div>
    
    <div class="control-group">
        Latitude: <input id="latitude" name="latitude" type="text" value="">
        Longitude: <input id="longitude" name="longitude" type="text" value="">
        <p>&nbsp;</p>
    </div>

    <span class="note-tips">Please drag and drop the marker to the correct position should your address/postcode not match the original placement.</span>
    <div id="map" class="" style="min-height: 500px;">Loading map...</div>
    
    <script src="assets/js/map.js" type="text/javascript"></script>
    <script src="https://maps.googleapis.com/maps/api/js?signed_in=true&callback=initMap" async defer></script>

</div>