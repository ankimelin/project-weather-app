const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=4923c0389d55c333ad872dc8b7b3e880"
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=4923c0389d55c333ad872dc8b7b3e880"

const cityElement = document.getElementById("city")
const tempElement = document.getElementById("temp")
const iconElement = document.getElementById("icon")
const descriptionElement = document.getElementById("description")
const sunriseElement = document.getElementById("sunrise")
const sunsetElement = document.getElementById("sunset")
const forecastTableElement = document.getElementById("forecastTable")

fetch(weatherUrl)
  .then((response) => {
    return response.json()
  })
  .then((weather) => {
    generateWeather(weather) // create new object containing only the data I use?
  })
  .catch((error) => {
    console.log("Fetch error", error)
  })

fetch(forecastUrl)
  .then((response) => {
    return response.json()
  })
  .then((forecast) => {
    generateForecast(forecast) // create new object containing only the data I use?
  })
  .catch((error) => {
    console.log("Fetch error", error)
  })

const generateWeather = weather => {
  const city = weather.name
  const temp = Math.round(weather.main.temp)
  const icon = getIcon(weather.weather[0].icon)
  const description = weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)

  handleTime(weather.sys.sunrise, weather.sys.sunset)
  const sunrise = time[0]
  const sunset = time[1]

  cityElement.innerHTML = city
  tempElement.innerHTML = `${temp}°`
  iconElement.innerHTML = `<img src='${icon}'>`
  descriptionElement.innerHTML = description
  sunriseElement.innerHTML = `Sunrise: ${sunrise} `
  sunsetElement.innerHTML = `Sunset: ${sunset} `
}

const generateForecast = forecast => {
  const noonForecast = forecast.list.filter(item => item.dt_txt.includes('12:00')) // filter already in fetch?

  noonForecast.forEach((forecast) => {
    forecastTableElement.innerHTML += generateHTML(forecast)
  })
}

const generateHTML = (forecast) => {
  handleDay(forecast.dt)
  const day = shortForecastDay

  const icon = getIcon(forecast.weather[0].icon)
  const temp = Math.round(forecast.main.temp)

  let forecastHTML = ''
  forecastHTML += `<li class="forecast-row">`
  forecastHTML += `<p>${day}</p> `
  forecastHTML += `<div><img src='${icon}'></div > `
  forecastHTML += `<p class="temp">${temp}°</p > `
  forecastHTML += `</li> `
  return (forecastHTML)
}

const handleTime = (sunrise, sunset) => {
  const sunriseDate = new Date(sunrise * 1000)
  const sunsetDate = new Date(sunset * 1000)
  const options = { hour: '2-digit', minute: '2-digit' }
  const sunriseTime = sunriseDate.toLocaleTimeString([], options)
  const sunsetTime = sunsetDate.toLocaleTimeString([], options)
  return time = [sunriseTime, sunsetTime]
}

const handleDay = day => {
  const forecastDate = new Date(day * 1000)
  const forecastDay = forecastDate.toString()
  return shortForecastDay = forecastDay.substring(0, 3)
}

const getIcon = icon => {
  const iconUrl1 = 'https://openweathermap.org/img/wn/'
  const iconUrl2 = '@2x.png'
  return icon = iconUrl1.concat(icon.concat(iconUrl2))
}