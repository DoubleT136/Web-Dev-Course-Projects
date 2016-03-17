function show_map()
{
        // When initiaing the map, default to Medford
        var init_pos = new google.maps.LatLng(42.4089325, -71.1196015);
        myOptions = {
                zoom : 13,
                center : init_pos,
                mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        get_location();
}

function get_location()
{
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(pos) {
                        myLat = pos.coords.latitude;
                        myLng = pos.coords.longitude;
                        request = new XMLHttpRequest();
                        request.open("POST",
                        "https://defense-in-derpth.herokuapp.com/sendLocation",
                        true);
                        request.setRequestHeader("Content-type",
                        "application/x-www-form-urlencoded");
                        request.onreadystatechange = function() {
                                if (request.readyState == 4 && request.status ==
                                    200) {
                                            raw = request.responseText;
                                            data = JSON.parse(raw);
                                            console.log(data);
                                    }
                        };
                        request.send("login=KAYE_SCHMIDT&lat=" +
                        myLat.toString() + "&lng=" + myLng.toString());
                        render_map();
                });
        } else {
                alert("Geolocation is not supported by your web browser.");
        }
}

function render_map()
{
        infowindow = new google.maps.InfoWindow();
        mypos = new google.maps.LatLng(myLat, myLng);
        map.panTo(mypos);
        marker[0] = new google.maps.Marker({
                position: mypos,
                title: "Your Current Location"
        });
        for (i = 0; i < (data.landmarks).length; i++)
        {
                marker[i + 1] = new google.maps.Marker({
                        position:
                        google.maps.LatLng(data["landmarks"][i]["geomery"]["coordinates"][0],
                        data["landmarks"][i]["geomery"]["coordinates"][1]),
                        title:
                });
        }
        marker.setMap(map);
        google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(marker.title);
                infowindow.open(map, marker);
        });
}
