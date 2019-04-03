function length(obj) {
    return Object.keys(obj).length;
}
$(document).ready(function () {
    console.log("ready");
    $.ajax({
        type: "GET",
        //dataType: "json",
        url: "http://54.160.238.67:5002/values",
        //cache: false,
        success: function (data) {
            
			data.sort(function (a, b) {
					if (a.dateandtime > b.dateandtime) {
						return 1;
					} else if (a.dateandtime < b.dateandtime) {
						return -1;
					} else {
						return 0;
					}
				});
				var l=length (data);
				var i;
				for (i = 0; i < l; i++)
				{
					
					var s = '<div class="item">' +
						'<img src="data:image/jpeg;base64,' +data[i]['photo']+'"  width="200" height="200">'+
						'<p> <b>Date: </b>' + data[i]['dateandtime'] + '<br></p>' +
						'<p> <b>Moisture: </b>' + data[i]['moisture'] + '<br></p>' +
						'<p> <b>Humidity: </b>' + data[i]['humidity'] + '<br></p>' +
						'<p> <b>Rain: </b>' + data[i]['rain'] + '<br></p>' +
						'<p> <b>Temperature: </b>' + data[i]['temperature'] + '<br></p>' +
						'<p> <b>Light: </b>' + data[i]['light'] + '<br></p>' +
						//'<p> <b>Water: </b>' + data[i]['water'] + '<br></p>' +
						//'<p> <b>Raining: </b>' + data[i]['raining'] + '<br></p>' +
						'<p> <b>Pest: </b>' + data[i]['insect'] + '<br></p>' +
						' </div > ';
					$("#division").append(s + "<br>");

				};

        }
		
    });
});



