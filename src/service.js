import axios from 'axios';

export default {
    getCountries: async () => {
        const { data } = await axios.get('https://restcountries.com/v2/all');
        return data;
    }
}