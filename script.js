document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
      return;
    console.log(value);
    
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=d3068e3e914bcf6b7ac1d4454bb8f605";
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        let results = "";
        results += '<h1>Weather in ' + json.name + "</h1>";
        for (let i = 0; i < json.weather.length; i++) {
            results += '<img class ="center" src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '<h2>' + json.main.temp + " &deg;F</h2>"
        results += "<p> Description: "
        for (let i = 0; i < json.weather.length; i++) {
            results += json.weather[i].description
            if (i !== json.weather.length - 1)
                results += ", "
            }
            results += "</p>";
            results += "<p> Humidity " + json.main.humidity + "%</p>";
            document.getElementById("weatherResults").innerHTML = results;
    });
  
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=d3068e3e914bcf6b7ac1d4454bb8f605";
    fetch(url2)
        .then(function(response) {
        return response.json();
        })
        .then(function(json) {
        let forecast = '<div class="container">';
        for (let i=0; i < 39; i++) {
            forecast += '<div class="col">';
            forecast += '<h3 class="date">' + moment(json.list[i].dt_txt).format('L') + "</h3>";
            forecast += '<h3 class="time">' + moment(json.list[i].dt_txt).format('h:mm:ss a') + "</h3>";
            forecast += '<p class="temperature">Temperature: ' + json.list[i].main.temp + " &deg;F</p>";
            forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
            forecast += "<p> Wind: " + json.list[i].wind.speed + "mps</p>";
            forecast += '</div>';
        }
        document.getElementById("forecastResults1").innerHTML = forecast;
        forecast = forecast + '</div>';
  
    });
  
  });
