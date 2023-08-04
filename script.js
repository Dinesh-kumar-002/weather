var backgroundImage = document.querySelector("#backgroundImage");
var apiKey = "f0290c26caf4a62e5b5861270e005b82";
var card = document.querySelector(".card");
var cities = document.querySelector(".cities");
function search() {
  var search_value = document.querySelector("#search").value;
  if(search_value=='' || search_value==' '){
    card.style.backgroundImage = `url('image/noresult.svg')`;
    card.innerHTML = `
        <div class="noresult2">
             <h1 id="noresult2">please Enter City name</h1>
        </div>
        `;
  }
  else{
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search_value}&appid=${apiKey}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          card.style.backgroundImage = `url('image/noresult.svg')`;
          card.innerHTML = `
          <div class="noresult">
               <h1 id="noresult">No city Found</h1>
          </div>
          `;
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        let temperature = data.main.temp;
       
        let weatherIcon = data.weather[0].icon;
        card.style.backgroundImage = `url('https://openweathermap.org/img/wn/${weatherIcon}@2x.png')`;
        let place = data.name;
        let humidity = data.main.humidity;
        let windspeed = data.wind.speed;
        let weather = data.weather[0].description;
        console.log(weatherIcon, typeof weatherIcon);
        card.innerHTML = `<div class="cardShow">
        <p>PLACE</p>
        <input type="text" disabled class="select state" value=${place}>
          <p>WEATHER</p>
          <input type="text" disabled class="select state" value=${weather}>
          <p>TEMPERATURE</p>
          <input type="text" disabled class="select temperature" value='${temperature} &deg; c' >
          <p>HUMIDITY</p>
          <input type="text" disabled class="select humidity" value='${humidity}%'>
          <p>WIND SPEED</p>
          <input type="text" disabled class="select windspeed" value='${windspeed} m/s'>
      </div>`;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
}

if(navigator.geolocation){
  console.log(navigator.geolocation.getCurrentPosition());
}