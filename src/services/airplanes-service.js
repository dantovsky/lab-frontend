import { http } from './config'

export default {
    listarStates: () => {
        return http.get('states')
    },

    // Flights guardados (favoritos) pelo user
    listarFlights: () => {
        return http.get('flights')
    },

    // Guarda um novo flight nos favoritos
    saveFlight: (flight) => {
        return http.post('flights', flight)
    },

    // Deleta um flight dos favoritos
    deletaFlight: (flight) => {
        return http.delete('flights', {data: flight})
    }    
}