//Get coordinates 
function get_coords()
{
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {

 set_weather(position.coords.latitude,position.coords.longitude);
        

    });

} else {
    alert("Error");
}
}
//set the weather
function set_weather(lat,lon)
{

        var apiKey = "d64b6f0e97c598ccf0f03718d1690fcc";
        var url = "https://api.openweathermap.org/data/2.5/weather?lat="
        var URL = url + lat + "&lon=" + lon + "&APPID=" + apiKey;
        console.log(URL);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", URL, true);
        xhr.send();
        xhr.onload = function() {
            if (xhr.status == 200) {
                var d = JSON.parse(this.responseText);
                set_vars(d);
                set_time();
                display_pictures();
                weather_status(d);
            }
        }
}

//display HTML elements
function set_vars(obj)
{
    document.getElementById("city").innerHTML=obj.name + "," + obj.sys.country;
    document.getElementById("temperature").innerHTML= convert_celcius(obj.main.temp)+ "&#x2103;"; 
    document.getElementById("wind_val").innerHTML = obj.wind.speed + " meter/sec";
    document.getElementById("high_val").innerHTML = convert_celcius(obj.main.temp_min) + "&#x2103;"; 
    document.getElementById("low_val").innerHTML = convert_celcius(obj.main.temp_max) + "&#x2103;"; 
    document.getElementById("cloud_val").innerHTML = obj.clouds.all + "%"; 
    
    
} 

//display weather status picture
function weather_status(obj)
{
    document.getElementById("weather_status").src ="http://openweathermap.org/img/w/"+obj.weather[0].icon+".png"
}

//convert kellvin to elcius
function convert_celcius(x)
{
    return Math.round(x-273.15);
}


// set the date
function set_time()
{
    setTimeout(set_time,100);
    var date = new Date();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    minutes = checkTime(minutes);
    hours = checkTime(hours);
    document.getElementById("time").innerHTML = hours + " : " + minutes;
    check_day(hours);

}
//
function checkTime(i)
{
    if(i < 10)
    i = "0"+i;
    return i;
}
//display pictures on html doc
function display_pictures()
{   
  
document.getElementById("main").style.backgroundImage ="url('https://s20.postimg.cc/ks7kxnrv1/conifer-countryside-dawn-785405.jpg')"    
    document.getElementById("wind_pic").src="https://s20.postimg.cc/skxs6bm25/wind.png";
    document.getElementById("high_pic").src="https://s20.postimg.cc/bx6a3swfh/temperature_1.png";
    document.getElementById("low_pic").src="https://s20.postimg.cc/6yirpa0cd/temperature.png";
    document.getElementById("cloud_pic").src="https://s20.postimg.cc/fgs7tlbzx/cloud.png";
}


// function on load
function init()
{
    animation();
    get_coords();
  
    
}

var j =1;
function animation()
{
    
    var myvar = setTimeout(animation,100);
    var message = "My Weather App";
    document.getElementById("title").innerHTML = message.substring(0,j);
    j++;
    if(j >=message.length+1)
    clearTimeout(myvar);
}


function check_day(hour)
{
    if(hour >= 20 &&  hour <= 6)
        {
            document.getElementById("main").style.backgroundImage ="url('https://s20.postimg.cc/ed8k1fvkd/night-1.jpg')"
            document.getElementById("main").style.color="white";
            document.getElementById("wind_pic").src="https://s20.postimg.cc/g6b05zmu5/wind-white.png";
            document.getElementById("high_pic").src="https://s20.postimg.cc/bx6a3sopp/temperature_1_-white.png";
            document.getElementById("low_pic").src="https://s20.postimg.cc/jd5jplzkd/temperature-white.png";
            document.getElementById("cloud_pic").src="https://s20.postimg.cc/czggmbzt9/cloud-white.png";
            
        }
}