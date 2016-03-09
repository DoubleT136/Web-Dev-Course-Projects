function parse () {
        request = new XMLHttpRequest();
        request.open("GET", "data.json", true);
        request.onreadystatechange = write_msg;
        request.send(null);

        function write_msg ()
        {
                if (request.readyState == 4 && request.status == 200) {
                        raw = request.responseText;
                        data = JSON.parse(raw);
                        msg = "";
                        for (i = 0; i < data.length; i++)
                        {
                                msg += "<p>" + data[i]["content"] +
                                data[i]["username"] + "<p/>";
                        }
                        (document.getElementById("messages")).innerHTML = msg;
                }
        }
}
