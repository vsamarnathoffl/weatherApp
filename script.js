document.addEventListener('DOMContentLoaded',()=>{
    const inputData = document.getElementById('input-Data');
    const getButton = document.getElementById('get-Button');
    const city = document.getElementById('city');
    const temp = document.getElementById('temp');
    const weatherData = document.getElementById('weather');
    const weatherDisplay = document.getElementById('weather-Data');
    const errorMessageDisplay = document.getElementById('error-Message');
    const API_KEY = "8cfec01785b675b94fd83d3d2a300c97";

    getButton.addEventListener('click',async()=>{
        let input = inputData.value.trim();
        if(input==="") return;

        try{
            const data = await fetchWeatherData(input);
            displayWeatherData(data);
        }catch(error){
            displayErrorMessage(error);
        }
    });

    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;


            const response = await fetch(url);

            if(!response.ok){
                throw new Error('City was not found')
            }

            const data = await response.json();
            return data;
    }
    function displayWeatherData(data){
        const {name, main, weather} = data;
        city.textContent = name;
        temp.textContent = `Temperature: ${main.temp}`;
        weatherData.textContent = `Weather: ${weather[0].main}`;
        if(weatherDisplay.classList.contains('hidden')===true)
            weatherDisplay.classList.remove('hidden');
        if(errorMessageDisplay.classList.contains('hidden')===false)
            errorMessageDisplay.classList.add('hidden');
    }

    function displayErrorMessage(error){
        console.log(error);
        if (weatherDisplay.classList.contains('hidden')===false)
          weatherDisplay.classList.add('hidden');
        if (errorMessageDisplay.classList.contains('hidden')===true)
          errorMessageDisplay.classList.remove('hidden');
        errorMessageDisplay.textContent=error;
    }

})