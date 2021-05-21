import { createStore } from 'vuex';
import { actions, mutations } from './mutation-types';
import service from '../service';

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    state: {
        countries: []
    },
    mutations: {
        [mutations.GET_COUNTRIES] (state, countries) {
            state.countries = countries;
        }
    },
    actions: {
        async [actions.INIT_STORE] ({ dispatch }) {
            dispatch(actions.GET_COUNTRIES);
        },
        async [actions.GET_COUNTRIES] ({ commit }) {
            const countries = await service.getCountries();            
            commit(mutations.GET_COUNTRIES, countries)
        }
    },
    modules: {
    },
    strict: debug
})