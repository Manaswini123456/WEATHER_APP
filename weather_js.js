 const api = {
     key: "d412359827be856b7b2dc4a1837a7739",
     base: "https://api.openweathermap.org/data/2.5/"
 }

 const searchbox = document.querySelector('.search-box');
 searchbox.addEventListener('keypress',setQuery);

 function setQuery(evt){
     if (evt.keyCode == 13){
         getResults(searchbox.value);
         console.log(searchbox.value)
     }
 }

 function getResults(query){
     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key} `)
     .then(weather =>{
         return weather.json();
     }).then(displayResults);
 }

 function displayResults(weather){
     console.log(weather);
     let city = document.querySelector('.location .city')
     city.innerText = `${weather.name}, ${weather.sys.country}`;

     let now = new Date();
     let date = document.querySelector('.location .date');
     date.innerText = dateBuilder(now);

     let temp = document.querySelector('.current .temp')
     temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

     let weather_el = document.querySelector('.current .weather');
     weather_el.innerText = weather.weather[0].main

     let hilow = document.querySelector('.hi-low')
     hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
 }

 function dateBuilder(d){
     let months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"]

    let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    

    let day = days[d.getDay()];
    let date = days[d.getDate()];
    let month = days[d.getMonth()];
    let year = days[d.getFullYear()];

    return `${day} ${date} ${month} ${year}`;
 }
