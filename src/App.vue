<template>
    <header>
        <h1>Where in the World?</h1>
        <!-- <a>Dark Mode</a> -->
    </header>
    <div class="container">
        <div class="filter-container">
            <search v-model:value="searchFilter" :placeholder="'Search for a country...'"></search>
            <dropdown :defaultText="'Filter by Region'" :options="regions" @optionClick="updateRegionFilter"></dropdown>
        </div>
        <div class="countries">
            <country v-for="country in filteredCountries" :key="country.alpha3Code" :details="country"></country>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import store from './store'
import { actions } from './store/mutation-types';

import Country from './components/Country.vue';
import Search from './components/Search.vue';
import Dropdown from './components/Dropdown.vue';

export default {
    name: 'App',
    components: {
        Country,
        Search,
        Dropdown
    },
    data () {
        return {
            searchFilter: '',
            regionFilter: ''
        }
    },
    created () {
        store.dispatch(actions.INIT_STORE);
    },
    methods: {
        updateRegionFilter(region) {
            this.regionFilter = region;
        }
    },
    computed: {
        ...mapState([
            'countries'
        ]),
        filteredCountries() {
            return this.countries
                    .filter(country => this.regionFilter ? country.region === this.regionFilter : true)
                    .filter(country => country.name.toLowerCase().includes(this.searchFilter.toLowerCase()))
        },
        regions() {
            return [...new Set(this.countries.map(country => country.region))].filter(country => country !== '');
        }
    }
}
</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    h1 {
        font-size: 1.4em;
    }

    b {
        font-weight: 600;
    }

    #app {
        --very-dark-blue: hsl(200, 15%, 8%);
        --dark-grey: hsl(0, 0%, 52%);
        --very-light-grey: hsl(0, 0%, 98%);

        font-family: 'Nunito Sans', sans-serif;
        background: var(--very-light-grey);

        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 50px;
            background: white;
            box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.1);
        }

        .container {
            flex: 1;
            padding: 0 50px 50px;

            .filter-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                padding: 50px 0;
            }
            .countries { 
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                grid-gap: 75px;
            }
        }
    }
</style>
