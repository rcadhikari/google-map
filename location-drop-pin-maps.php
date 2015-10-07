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

<?php

$venues_list = array(
    array("id"=>"1","school"=>"Pokhara Airport, Nepal","lat"=>"28.200075642855282","lng"=>"83.98162408465578",
        "detail"=>"Pokhara Airport, is a regional airport serving Pokhara in Nepal. The airport was established on 4 July 1958 and is operated by the government. It offers regular connections to Kathmandu and Jomsom; and seasonal connections to Manang.
            <a href='https://en.wikipedia.org/wiki/Pokhara_Airport' target='_blank'>Wikipedia</a><br>
            <strong>Address:</strong> Nagdhunga, Pokhara 33700, Nepal<br>
            <strong>Elevation:</strong> 827 m<br>
            <strong>Code:</strong> PKR<br>
            <strong>Phone:</strong> +977 61-465979
        "),
    array("id"=>"2","school"=>"Siddhartha Gautama Birth Place, Lumbuni, Nepal","lat"=>"27.48727496586207","lng"=>"83.27701900161128",
        "detail"=>"Lumbini is a Buddhist pilgrimage site in the Rupandehi District of Nepal. It is the place where, according to Buddhist tradition, Queen Mayadevi gave birth to Siddhartha Gautama in 563 BCE.
            <a href='https://en.wikipedia.org/wiki/Lumbini' target='_blank'>Wikipedia</a><br>
            <strong>Address:</strong> Taulihawa Road, 32900, Nepal<br>
            <strong>Elevation:</strong> 827 m<br>
            <strong>Code:</strong> PKR<br>
            <strong>Phone:</strong> +977 61-465979
        "),
    array("id"=>"3","school"=>"Sagarmatha/Mount Everent","lat"=>"27.98765537407214","lng"=>"86.9248420312133",
        "detail"=>"Mount Everest, also known in Nepal as Sagarm?th? and in Tibet as Chomolungma, is Earth's highest mountain. It is located in the Mahalangur mountain range in Nepal. Its peak is 8,848 metres above sea level.
            <a href='https://en.wikipedia.org/wiki/Mount_Everest' target='_blank'>Wikipedia</a><br>
            <strong>Location:</strong> Solukhumbu District, Sagarmatha Zone, Nepal<br>
            <strong>Elevation:</strong> 8,848 m<br>
            <strong>Prominence:</strong> 8,848 m<br>
            <strong>First ascent:</strong> May 29, 1953<br>
            <strong>First ascenders:</strong> Tenzing Norgay, Edmund Hillary<br>
            <strong>Mountain range:</strong> Himalayas, Mahalangur Himal<br>
        "),
    array("id"=>"4","school"=>"Karnali River (Karnali Bridge) in Nepal, Asia","lat"=>"28.64050381728877","lng"=>"81.28428345507814",
        "detail"=>"Karnali, also called Ghaghara is a perennial trans-boundary river originating on the Tibetan Plateau near Lake Mansarovar. It cuts through the Himalayas in Nepal and joins the Sharda River at Brahmaghat in India.
            <a href='https://en.wikipedia.org/wiki/Karnali_Bridge' target='_blank'>Karnali Bridge Wikipedia</a>, <a href='https://en.wikipedia.org/wiki/Karnali_Bridge'>Ghaghara</a><br>
            <strong>Address:</strong> Chisapani, Kailali Zone, Nepal<br>
            <strong>Length:</strong> 1,080 km<br>
            <strong>Basin area:</strong> 127,950 km(square)<br>
            <strong>Code:</strong> Ganges<br>
            <strong>Bridges:</strong> Karnali Bridge<br>
            <strong>Countries:</strong> Nepal, China, India
        "),
    array("id"=>"5","school"=>"Pashupatinath Temple, Hindu temple in Kathmandu, Nepal","lat"=>"27.71043380333225","lng"=>"85.348698028836",
        "detail"=>"The Pashupatinath Temple is a famous, sacred Hindu temple dedicated to Pashupatinath and is located on the banks of the Bagmati River 5 kilometres north-east of Kathmandu Valley in the eastern city of Kathmandu, the capital of Nepal.
            <a href='https://en.wikipedia.org/wiki/Pashupatinath_Temple' target='_blank'>Wikipedia</a><br>
            <strong>Address:</strong> Pashupati Nath Road, Kathmandu 44621, Nepal<br>
            <strong>Function: </strong> Hindu temple<br>
            <strong>Architectural styles: </strong> Hindu temple architecture, Architecture of Nepal<br>
        ")
);
//$data = json_encode($venues_list[0]['detail']);
$venues_count = count($venues_list);
?>
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
<script type="text/javascript">
    var addressList = [
        <?php
        if (count($venues_count)) {
            $comma = '';
            foreach ($venues_list as $item) {
             $item = (object)$item;
            ?>
        {
            "title": '<?php echo $item->school; ?>',
            "lat": '<?php echo $item->lat; ?>',
            "lng": '<?php echo $item->lng; ?>',
            "description": <?php echo json_encode($item->detail);?>
        }
        <?php
                echo $comma = ',';
            }
        }
        ?>
    ];
    //alert(addressList);
    window.onload = function () {
        LoadMultiAddressOnGoogleMap(addressList);
    }
</script>

    <!-- Enable the system error message for javascript -->
<div id="system-message-container"></div>
<div class="application-form success-message">
    <div class="control-group"><p>&nbsp;</p>
        <?php
        $found_result = '<span class="required">No audition venue found yet.';
        if ($venues_count) {
            $found_result = 'Total <b>'.$venues_count.'</b> venues found.';
        }
        echo $found_result;
        ?>
    </div>


    <div id="map_canvas" style="height:500px; border: 0px solid #3872ac;"></div>

    <script src="assets/js/map.js" type="text/javascript"></script>
    <script src="https://maps.googleapis.com/maps/api/js?signed_in=true&callback=initMap" async defer></script>
</div>