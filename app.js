$(document).ready(function () {

    let citiesArray = [];

    $.getJSON("./json/city_list/city_list.json", callbackFuncWithData);

    function callbackFuncWithData(data) {
        for (i = 0; i < data.length; i++) {
            citiesArray.push(data[i].name.toLowerCase());
        }
    }

    $('.btn').click(function () {
        clickEvent();
    });

    // pravi da radi enter kad je na inputu
    $('.cityName').keypress(function () {
        if (event.keyCode === 13) {
            $('.btn').click();
        }
    });

    function clickEvent() {
        let city = $('.cityName').val().toLowerCase();
        $('.cityName').val('');
        // ako nije nista upisano prekida izvrsavanje
        if (city === '') {
            $('.output').empty().append(`<div>Unesite ime grada!</div>`);
            return;
        }
        // ako je upisano bograd pretvara u belgrade
        if (city === 'beograd') {
            city = 'belgrade';
        }
        // ***
        if ($.inArray(city, citiesArray) != -1) {
            weatherBalloon(city);
        } else {
            $('.output').empty().append(`<div>Nema podataka</div>`);
        }
    }

    function weatherBalloon(city) {
        var key = 'da01cd55ef6b52ef3426a9062a2cf423';
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + key)
            .then(function (resp) { return resp.json() }) // Convert data to json
            .then(function (data) {

                // Weather card
                let htmlData = `
                    <div>
                        <div>${data.name}</div>
                        <div>${Math.trunc(data.main.temp - 273.15)}&#8451</div>
                        <div>${data.weather[0].main}</div>
                        <div>${data.weather[0].description}</div>
                    </div>
                `;

                $('.output').empty().append(htmlData);
            })
            .catch(function () {
                $('.output').empty().append(`<div>Error conecting to API...</div>`);
            });
    };












});




