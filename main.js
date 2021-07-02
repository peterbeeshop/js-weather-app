let btn = document.querySelector("button");
let input = document.querySelector("input");
let message = document.getElementById("message");
let city = document.getElementById("name");
let theLocaltime = document.getElementById("localtime");
let myMain = document.getElementById("main");
let image = document.querySelector("img");
let theCountry = document.getElementById("country");
btn.addEventListener("click", getWeather);

function getWeather(e) {
  e.preventDefault();
  let value = input.value;

  if (value === "") {
    theCountry.textContent = "Enter valid City or town";
    city.textContent = "";
    theLocaltime.textContent = "";
    message.textContent = "";
    myMain.textContent = "";
    image.src = "";
  } else {
    fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${value}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "9c5aef89bemsh83112047e4398a9p1faef8jsn9d1ff4189521",
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { location, current } = data;
        const { country, localtime, name, region, tz_id } = location;
        let conditions = current.condition;
        const { text, icon } = conditions;
        city.textContent = `City: ${name}`;
        theCountry.textContent = `Country: ${country}`;
        theLocaltime.textContent = `LocalTime: ${localtime}`;
        message.textContent = text;
        myMain.textContent = `Temp: ${current.temp_c}`;
        image.src = icon;
      })
      .catch((err) => {
        theCountry.textContent = "No matching location found";
        city.textContent = "";
        theLocaltime.textContent = "";
        message.textContent = "";
        myMain.textContent = "";
        image.src = "";
      });
  }

  input.value = "";
}
