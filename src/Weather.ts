const WEATHER_FOR_CITIES = [
  { city: "Lille", country: "France", temperatureCelsius: -2, weatherCode: 2 },
  { city: "Paris", country: "France", temperatureCelsius: -1, weatherCode: 45 },
  { city: "Reims", country: "France", temperatureCelsius: -4, weatherCode: 0 },
];

export function getTemperatureForCity(city: string): number {
  const weather = WEATHER_FOR_CITIES.find((weather) => weather.city === city);
  if (!weather) {
    throw new Error(`No weather found for city ${city}.`);
  }
  return weather?.temperatureCelsius;
}
