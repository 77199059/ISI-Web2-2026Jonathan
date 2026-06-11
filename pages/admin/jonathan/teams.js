import TeamsService from "./teams.service.js";

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
    const tableBody = document.getElementById('teams-table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    const teams = await loadTeams();

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

// Ejecutar la función automáticamente al cargar el HTML
document.addEventListener('DOMContentLoaded', buildTable);


// Función para buscar un equipo por ID usando el servicio de la API
async function searchTeam() {
    const inputId = document.getElementById('teamId'); // El cuadro de texto donde escribís el "9"
    const tableBody = document.getElementById('teams-table-body');
    if (!tableBody || !inputId) return;

    // Si la caja está vacía, limpia y vuelve a listar todos los equipos
    if (!inputId.value.trim()) {
        buildTable();
        return;
    }

    try {
        // Hace el GET a tu API usando el ID
        const team = await teamsService.getTeamById(inputId.value.trim());
        tableBody.innerHTML = ''; // Limpiamos la tabla para mostrar solo el encontrado

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.id}</td>
            <td><strong>${team.name}</strong></td>
            <td>${team.description || 'Sin descripción'}</td>
            <td>${team.membersCount ?? 0}</td>
           
        `;
        tableBody.appendChild(row);

    } catch (error) {
        // Si ponés un ID que no existe en tu base de datos de SQL Server
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#dc3545; font-weight:500;">El ID del equipo no existe.</td></tr>`;
    }
}

// Buscamos el botón de tu formulario usando una clase o ID general para asegurar que lo agarre
document.addEventListener('DOMContentLoaded', () => {
    // Intentará buscarlo por el id común o el texto del botón
    const searchButton = document.getElementById('searchTeamButton') || document.querySelector('button.btn-primary') || [...document.querySelectorAll('button')].find(b => b.textContent.includes('obtener'));
    
    if (searchButton) {
        searchButton.addEventListener('click', searchTeam);
    } else {
        console.warn("No se pudo mapear el botón 'obtener equipo'. Revisá que tenga un ID válido.");
    }
});