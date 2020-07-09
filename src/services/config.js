import axios from 'axios'

export const http = axios.create({
    // baseURL: 'https://opensky-network.org/api/states/all?lamin=45.8389&lomin=5.9962&lamax=47.8229&lomax=10.5226'
    baseURL: 'http://localhost:8080/api/'
})