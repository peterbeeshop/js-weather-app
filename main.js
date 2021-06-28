let btn = document.querySelector("button");
let input = document.querySelector("input");
let message = document.getElementById("message");
let city = document.getElementById("name");
let myMain = document.getElementById("main");
let theCountry = document.getElementById("country");
btn.addEventListener("click", getWeather);

function getWeather(e) {
  e.preventDefault();
  let value = input.value;

  if (value === "") {
    theCountry.textContent = "Enter valid City or town";
  } else {
    fetch(
      `https://community-open-weather-map.p.rapidapi.com/find?q=${value}&cnt=1&mode=null&lon=0&type=link%2C%20accurate&lat=0&units=imperial%2C%20metric`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "9c5aef89bemsh83112047e4398a9p1faef8jsn9d1ff4189521",
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let list = data.list;
        list.map((item) => {
          const { name, weather, sys } = item;
          city.textContent = "city: " + name;
          theCountry.textContent = `country: ${sys.country}`;
          let myWeather = weather;
          myWeather.map((ele) => {
            const { description, main } = ele;
            message.textContent = `description: ${description}`;
            myMain.textContent = `Mainly: ${main}`;
            // console.log(description, main);
          });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  input.value = "";
}
