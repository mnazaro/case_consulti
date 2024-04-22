import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

axios.get('/setor').then((response) => {
    console.log(response.data);
}).catch((error) => {
    console.error('Error fetching data:', error);
});

axios.get('/empresa').then((response) => {
    console.log(response.data);
}).catch((error) => {
    console.error('Error fetching data:', error);
});

export default axios;
