const getWeatherButton = document.querySelector("#get_weather");

const inputText = document.querySelector("#input_text");

const serverURL = "https://api.openweathermap.org/data/2.5/weather?appid=00e5d75858ea891b4edce507d2edf363&units=metric";

function getWeather(query)
{
  return serverURL + "&q=" + query;
}

function clickEventHandler()
{
  document.querySelector(".weather_report").style.display = "block";
  let city = inputText.value;

  fetch(getWeather(city))
  .then(response => response.json())
  .then(showWeather)
}

getWeatherButton.addEventListener("click", clickEventHandler );

//show weather report
function showWeather(weather)
{
  console.log(weather);

  //city stats
  let cityName = document.querySelector(".city");
  cityName.innerHTML = `${weather.name}, ${weather.sys.country}`;

  //temp stats
  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  let temp_min_max = document.querySelector(".temp_min_max");
  temp_min_max.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

  let weatherConditon = document.querySelector(".weatherCondition"); 
  weatherConditon.innerHTML = `${weather.weather[0].main}`;

  let weatherIcon = document.querySelector(".img");
  weatherIcon.innerHTML = `<img src=" http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="${weather.weather[0].main}">`;

  //date
  let date = document.querySelector(".date");
  let todayDate = new Date();
  date.innerHTML = dateManager(todayDate);

  if(weatherConditon.textContent == 'Thunderstorm')
  {
    document.querySelector("body").style.backgroundImage = "url('img/thunderstorm.jpg')";
  } 
  else if(weatherConditon.textContent == 'Rain')
  {
    document.querySelector("body").style.backgroundImage = "url('img/rain.jpg')";
  }
   else if(weatherConditon.textContent == 'Snow')
  {
    document.querySelector("body").style.backgroundImage = "url('img/snow.jpg')";
  }
   else if(weatherConditon.textContent == 'Mist')
  {
    document.querySelector("body").style.backgroundImage = "url('img/atmosphere.jpg')";
  }
   
  else if(weatherConditon.textContent == 'Clouds')
  {
    document.querySelector("body").style.backgroundImage = "url('img/cloud.jpg')";
  }
  else if(weatherConditon.textContent == 'Clear')
  {
    document.querySelector("body").style.backgroundImage = "url('img/clear.jpg')";
  }

}

//date
function dateManager(args)
{
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


  let year = args.getFullYear();
  let month = months[args.getMonth()];
  let date = args.getDate();
  let day = days[args.getDay()];

  return `${date} ${month} , ${year} <br>${day}`;

}
