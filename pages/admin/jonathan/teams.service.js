 import HttpService from "../../../shared/services/http.service.js";

export default class TeamsService extends HttpService {
    constructor() {
        super(); 
    }
 
    // GET: Obtener todos los equipos usando la clase base
    async getAllTeams() {
        try {
            return await this.get('teams'); 
        } catch (error) {
            console.error("Error al traer los equipos mediante HttpService:", error);
            throw error;
        }
    }

    // GET por ID: Obtiene un solo equipo usando su identificador
    async getTeamById(id) {
        try {
            return await this.get(`teams/${id}`); 
        } catch (error) {
            console.error(`Error en getTeamById para el ID ${id}:`, error);
            throw error;
        }
    }
}