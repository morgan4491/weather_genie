// Import fs promises version to read and write to our searchHistory.json file
import { promises as fs } from 'fs';
import { v4 } from 'uuid';

class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = v4();   // The v4() function creates a unique identifier UUID for every instance of the class City
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a private read method that reads from the searchHistory.json file - this method will only be accessible within the HistoryService class
  private async read() {
    try {
      // Use fs to read the searchHistory.json file
      const rawArray = await fs.readFile('db/searchHistory.json', 'utf-8');

      // Using fs will give you unparsed JSON data array
      // return the parsed array - ie. JSON.parse(rawArray);
      const parsedArray = JSON.parse(rawArray);

      return parsedArray;
    } catch (error) {
      console.error('Error reading this file', error);
      throw error;
    }

  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    // Use fs to overwrite the searchHistory.json file with the stringified array of city objects
    try {
      const data = JSON.stringify(cities);
      
      await fs.writeFile('db/searchHistory.json', data, 'utf-8');
    } catch (error) {
      console.error('Error writing to this file', error);
      throw error;
    }
  }

  async getCities() {
    // Get the array of cites, using the read method
    const cityArray = await this.read();

    return cityArray;
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    // Get the array of city objects from searchHistory.json, using this.read
    const citiesArray = await this.getCities();

    // First use citiesArray.find() to check if there is already a city object matching the city name
    // If there is, return without continuing the rest of the code below
    if (citiesArray.find((cityList: City) => cityList.name === city)) {
      return;
    }

    // Create a city variable that stores a new City object - Pass in the city parameter as an argument
    const newCity = new City(city);

    // Push the new city object to the citiesArray above
    citiesArray.push(newCity);

    // Use this.write to overwrite the searchHistory.json file with our new array of city objects
    await this.write(citiesArray);
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    // Get the cities array
    const citiesArray = await this.getCities();
    console.log('id', id);
    // Filter out the city object within citiesArray that has an id matching the id above - ie. citiesArray.filter(() => {})
    const filterCity = citiesArray.filter((city: City) => city.id !== id);
    console.log('filtered', filterCity);
    // Use the write method to overwrite the searchHistory.json file
    await this.write(filterCity);

    // console.log a confirmation that the city has been removed
    console.log(`City with id ${id} has been removed`);
  }
}

export default new HistoryService();
