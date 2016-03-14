function show_map() {
        mypos = get_location();
        var myOptions = {
                zoom : 13,
                center : mypos,
                mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

}

function get_location() {
        return my_pos = navigator.geolocation.getCurrentPosition(function(pos) {
                myLat = pos.coords.latitude;
                myLng = pos.coords.longitude;
                console.log(myLat);
                console.log(myLng);
                return mypos = new google.maps.LatLng(myLat, myLng);
        });
}
