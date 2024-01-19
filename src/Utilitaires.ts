export class Utilitaires {
    static async getListCity(name : string) : Promise<void> {
            const cityResponse = await fetch(
                `https://geocode.maps.co/search?q=${name}&api_key=65a4fed00e84b807084661tisfc7f77`
            );
            
            return await cityResponse.json();
            
        }

    static async getWeather(latitude : number, longitude : number) : Promise<void> {

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
          );
          const weather = (await weatherResponse.json()) as {
            current: { temperature_2m: number; weather_code: number };
          };
      
            console.log(weather.current.temperature_2m);
            console.log(weather.current.weather_code);
        }
    }

    
       
    
