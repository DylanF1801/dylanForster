$('#btnOne').click(function() {
    $.ajax({
        url: 'libs/php/weather.php',
        type: 'POST',
        dataType: 'json',
        data: {
            north: $('#north').val(),
            south: $('#south').val(),
            east: $('#east').val(),
            west: $('#west').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if(result.status.name == "ok") {
                $("#txtA").html(result["data"][0]["stationName"]);
                $("#txtB").html(result["data"][0]["temperature"]);
                $("#txtC").html(result["data"][0]["clouds"]);
                $("#txtD").html(result["data"][0]["humidity"]);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " : " + errorThrown);
        }
    });
});

$('#btnTwo').click(function() {
    $.ajax({
        url: 'libs/php/wikiSearch.php',
        type: 'POST',
        dataType: 'json',
        data: {
            q: $('#search').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if(result.status.name == "ok") {
                $('#txtA').html('<p>Title: ' + result.data[0].title + '</p><p>Summary: ' + result.data[0].summary + '</p>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " : " + errorThrown);
        }
    });
});

$('#btnThree').click(function() {
    $.ajax({
        url: 'libs/php/timeZone.php',
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $('#lat').val(),
            lng: $('#lng').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));
        
            if(result.status.name == "ok") {
                    $('#txtA').html('<p>Timezone: ' + result.data.timezoneId + '</p>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " : " + errorThrown);
        }
    });
});
