import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://react-my-burger-efd33.firebaseio.com/'
});

export default instance;