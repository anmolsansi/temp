document.getElementById("searchButton").addEventListener("click", function () {

  let locSearch = (document.getElementById('searchBar').value);
  let apiLoc = "https://weatherdbi.herokuapp.com/data/weather/"+locSearch+"";
  let myRequest = new XMLHttpRequest();

  myRequest.addEventListener('load', function(x){

    let data = JSON.parse(myRequest.responseText);
    console.log(data['status']);
    data['status'] === 'fail' ? alert('You did not enter a real location, enter a real loction') : (futureForecast(data), currentWeather(data));
  });
  myRequest.open('GET', apiLoc);

  myRequest.send();
});

function currentWeather(data) {
  document.getElementById("city").innerHTML= "Weather in "+data.region;
  document.getElementById("hum").textContent= "Humidity : "+data.currentConditions.humidity;
  document.getElementById("icon").src = data.currentConditions.iconURL;
  document.getElementById("currentTemp").textContent= data.currentConditions.temp.f +'°F';
  document.getElementById("preci").textContent= "Precipitation : "+data.currentConditions.precip;
  document.getElementById("des").textContent= data.currentConditions.comment;
  document.getElementById("windy").textContent= "Wind : "+data.currentConditions.wind.mile +'mph';
  document.getElementById("dayh").textContent= "Day Hour : "+data.currentConditions.dayhour;
}

function futureForecast(data) {
  forecastData = data.next_days

  removeWeather('#forecast-parent');

  forecastData.forEach((forecast) => {
    let fcDay = forecast.day;
    let fcComment = forecast.comment;
    let fcMaxTemp = forecast.max_temp.f;
    let fcMinTemp = forecast.min_temp.f;
    let fcIcon = forecast.iconURL;

    let forecastDay = document.createElement('p');
    forecastDay.textContent = `${fcDay}`;
    forecastDay.className = ('dayClass');
    let forecastComment = document.createElement('p');
    forecastComment.textContent = `${fcComment}`;
    forecastComment.className = ('commentClass');
    let forecastMaxTemp = document.createElement('p');
    forecastMaxTemp.textContent = `${fcMaxTemp}`;
    forecastMaxTemp.className = ('maxtempClass');
    let forecastMinTemp = document.createElement('p');
    forecastMinTemp.textContent = `${fcMinTemp}`;
    forecastMinTemp.className = ('mintempClass');
    let forecastIcon = document.createElement('img');
    forecastIcon.src = fcIcon;
    forecastIcon.className = ('iconClass');


    let parentForecast = document.getElementById("forecast-parent");
    let singleForecast = document.createElement("div");
    singleForecast.className = ("forecastPapi");
    singleForecast.append(forecastDay, forecastIcon, forecastComment, forecastMaxTemp, forecastMinTemp);
    parentForecast.append(singleForecast);
  });
};

let lat = 0;
let long = 0;
function success(l){

    let lat = l.coords.latitude;
    let long = l.coords.longitude;

    let geoURL ="https://weatherdbi.herokuapp.com/data/weather/"+ lat +"," + long +"";
    let myRequest = new XMLHttpRequest();

    myRequest.addEventListener('load', function(y){

      let data = JSON.parse(myRequest.responseText);

      futureForecast(data);
      currentWeather(data);
    });
    myRequest.open('GET', geoURL);

    myRequest.send();
}

function error(e){
    console.log(e);
    alert('Error: ' + e.message);
}

function removeWeather(x) {
  let removeDiv = document.querySelector(`${x}`);
  while (removeDiv.lastChild) {
    removeDiv.removeChild(removeDiv.lastChild)
  };
};

window.onload = function(){
  setTimeout(function(){
    document.getElementById("fadein").remove();
  },1000);
};

document.getElementById("geoButton").addEventListener("click", function () {
  removeWeather('#forecast-parent');
  navigator.geolocation.getCurrentPosition(success, error);
});
