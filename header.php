<?php
/**
 * @package: google-map
 * @FileType: PHP Script
 * @author RC Adhikari <http://rcadhikari.blogspot.co.uk>
 * Date: 25/08/2015 16:30
 */


// Function to print data
if (!function_exists('pm')) {
    function pm($data, $exit=false)
    {
        echo '<pre>';
        print_r($data);
        echo '</pre>';

        if ($exit) {
            exit();
        }
        #pm ( nl2br(str_replace('#__','aa_',$db->getQuery())), 1 );
    }
}
?>
    <head>
        <title>Home - Welcome to Google Map manipulation</title>
    </head>

    <link rel="stylesheet" href="assets/css/map.css" type="text/css" />
    <div class="header">
        <a href="/" title="Create Google Marker">Home - Welcome to Google Map manipulation </a>
    </div>