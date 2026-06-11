export default class TeamsService {
    // GET: Obtener todos los equipos directamente desde la API
    async getAllTeams() {
        const response = await fetch('http://localhost:5102/api/teams', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Si la API responde con un error, lo atrapamos
        if (!response.ok) {
            throw new Error(`Error al traer los equipos de la API: ${response.statusText}`);
        }

        // Devolvemos la lista de equipos en formato JSON
        return await response.json(); 
    }

 
    // GET por ID: Obtiene un solo equipo usando su identificador
    async getTeamById(id) {
        try {
            const response = await fetch(`http://localhost:5102/api/teams/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`No se encontró el equipo con ID: ${id}`);
            }

            return await response.json(); 
        } catch (error) {
            console.error("Error en getTeamById:", error);
            throw error;
        }
    }
}

