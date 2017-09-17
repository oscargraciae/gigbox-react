import axios from 'axios';

export function setService(service) {
  return {
    type: 'SET_SERVICE',
    payload: service,
  };
}

export async function loadService(serviceId) {
  axios.defaults.baseURL = 'http://localhost:3000';
  // axios.defaults.baseURL = 'https://api.chambita.mx';
  const service = await axios.get(`/api/v1/services/${serviceId}`);
  return setService(service.data);
}
