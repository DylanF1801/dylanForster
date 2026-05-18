$('#btnOne').click(function() {
    $.ajax({
        url: 'libs/php/weather.php',
        type: 'GET',
        dataType: 'json',
        data: {
            lat: $('.lat').val(),
            lng: $('.lng').val(),
            lang: $('.lang').val()
        },
        success: function(result) {

            if(result.status.name == "ok") {
                
                $('.results-box').html(result['data']['weatherObservation']['clouds']);
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
        type: 'GET',
        dataType: 'json',
        data: {
            q: $('#search').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if(result.status.name == "ok") {
                $('.results-box').html('<h2>Results</h2><p>Title: ' + result.data[0].title + '</p><p>Description: ' + result.data[0].description + '</p>');
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
        type: 'GET',
        dataType: 'json',
        data: {
            lat: $('.lat').val(),
            lng: $('.lng').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));
            $('.results-box').html('<h2>Results</h2><p>Timezone: ' + result.data.timezoneId + '</p>');
                if(result.status.name == "ok") {
                    console.log("Timezone data is available.")
                }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " : " + errorThrown);
        }
    });
});
