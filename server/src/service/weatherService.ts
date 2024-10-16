import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

// TODO: Define an interface for the Coordinates object

interface Coordinates {
  latitude: number;
  longitude: number;
  cityName: string;
  state: string;
  country: string;
}

// TODO: Define a class for the Weather object

class WeatherObject {

  cityName: string;
  temp: number;
  wind: number;
  humidity: number
  date: string;
  icon: string;

  constructor(cityName: string, temp: number, wind: number, humidity: number, date: string, icon: string) {
    this.cityName = cityName
    this.temp = temp
    this.wind = wind
    this.humidity = humidity
    this.date = date
    this.icon = icon
  }

}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string; // ternary opertor 
  private API_Key?: string;
  private cityName: string;
  
  constructor() {
    this.API_Key = process.env.API_KEY
    this.baseURL = process.env.API_BASE_URL
    this.cityName = ''
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {

    const locationData = `${this.baseURL}/data/2.5/weather?q=${this.cityName}&appid=${this.API_Key}`;

    fetch(locationData)
      .then(response => response.json())
      .then(apiResult => {
        console.log(apiResult)
      })
  }


  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates { }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string { }
  
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string { }
  
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() { }
  
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) { }
  
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) { }
  
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) { }
  
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    const res = await axios.get(process.env.API_BASE_URL + `/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}`);

    return res.data;
  }
}

export default new WeatherService();
