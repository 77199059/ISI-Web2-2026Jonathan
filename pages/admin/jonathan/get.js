import TeamsService from "../../../shared/services/teams.service.js";

const teamsService = new TeamsService();

// Cargar los equipos desde el servicio de la API
async function loadTeams() {
    try {
        const teams = await teamsService.getAllTeams();
        return teams; 
    } catch (error) {
        console.error("Error al cargar los equipos en la interfaz:", error);
        return []; 
    }
}

// Construir la tabla dinámicamente mapeando los datos de la API
async function buildTable() {
    const teams = await loadTeams();
    const tableBody = document.getElementById('teams-table-body');
    
    if (!tableBody) return;
    tableBody.innerHTML = '';

    if (teams.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#666;">No hay equipos registrados o la API está desconectada.</td></tr>`;
        return;
    }

    teams.forEach(team => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.id}</td>
            <td><strong>${team.name}</strong></td>
            <td>${team.description || 'Sin descripción'}</td>
            <td>${team.membersCount ?? 0}</td>
            <td>
                <span class="status-ready">Activo</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

//Ejecutar la función automáticamente al cargar el HTML
document.addEventListener('DOMContentLoaded', buildTable);




//buscar un equipo específico por ID al presionar el botón azul
async function searchTeam() {
    const inputId = document.getElementById('teamId'); 
    const tableBody = document.getElementById('teams-table-body');
    
    if (!tableBody) return;

    // Si la caja está vacía, limpia y vuelve a listar todos los equipos
    if (!inputId.value.trim()) {
        buildTable();
        return;
    }

    try {
        const team = await teamsService.getTeamById(inputId.value.trim());
        tableBody.innerHTML = ''; // Limpiamos las filas viejas

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.id}</td>
            <td><strong>${team.name}</strong></td>
            <td>${team.description || 'Sin descripción'}</td>
            <td>${team.membersCount ?? 0}</td>
            <td>
                <span class="status-ready" style="background-color: #e8f0fe; color: #1a73e8;">Listo</span>
            </td>
        `;
        tableBody.appendChild(row);

    } catch (error) {
        // Si digitan un número que no existe en tu base de datos de SQL Server
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#dc3545; font-weight:500;">❌ El ID del equipo no existe.</td></tr>`;
    }
}

// Vinculamos la búsqueda al clic de tu botón azul
document.getElementById('deleteTeamButton').addEventListener('click', searchTeam);