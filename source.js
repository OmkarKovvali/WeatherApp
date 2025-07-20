const form = document.getElementById("weather-form"); //document represents the whole html!
//addEventListener is now tied to the form.

const output = document.getElementById("weather-output");

form.addEventListener("submit", async (event)=>{
    event.preventDefault();
    const cityName = document.getElementById("city").value;
    

    output.innerHTML = ""; //Useful to not have residual outputs left when doing multiple times lesgo
    //textContext is just for plain text while innerHTML can put in all html stuff w tags
    output.textContent = "Loading...";
    try{
        const data = await getWeather(`http://api.weatherapi.com/v1/forecast.json?key=6c56a8cf6f764a348fc25359252007&q=${cityName}&days=1&aqi=no&alerts=no
    `);
        output.innerHTML = `
        <h2>Weather in ${data.location.name}</h2>
        <p>Region: ${data.location.region}</p>
        <p>Country: ${data.location.country}</p>
        <p>Temperature: ${data.current.temp_f} F</p>
        <p>Feels like: ${data.current.feelslike_f} F</p>
        <p>Condition: ${data.current.condition.text}</p>
        <img src="https:${data.current.condition.icon}" alt="weather icon" />
    `;

    }
    catch(err){
        output.textContent="An error occured in loading the weather API. Try again."
    }
    
   
    



    console.log(output)
});

async function getWeather(url){
    let response = await fetch(url);
    if(!response.ok) throw new Error("Network response did not work out");
    let data = await response.json();
    return data;
}

