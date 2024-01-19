export class Utilitaires {
    static async getListCity(name : string) : Promise<void> {
            const cityResponse = await fetch(
                `https://geocode.maps.co/search?q=${name}&api_key=65a4fed00e84b807084661tisfc7f77`
            );
            console.log(cityResponse);
            
        }
       
    
}