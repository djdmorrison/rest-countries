<template>
    <header>
        <h1>Where in the World?</h1>
        <a @click="toggleDarkTheme()" class="dark-toggle">
            <svg v-if="!darkTheme" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-if="darkTheme" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 12L23 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 2V1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 23V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20 20L19 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20 4L19 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4 20L5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4 4L5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 12L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ darkTheme ? 'Light Mode' : 'Dark Mode' }}</span>
        </a>
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
            regionFilter: '',
            darkTheme: false
        }
    },
    created () {
        store.dispatch(actions.INIT_STORE);
    },
    methods: {
        updateRegionFilter(region) {
            this.regionFilter = region;
        },
        toggleDarkTheme() {
            this.darkTheme = !this.darkTheme;
            document.body.classList.toggle('dark-theme');
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
    $mobile-breakpoint: 414px;
    $tablet-breakpoint: 767px;

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    h1 {
        font-size: 1.4em;
    }
    
    a {
        cursor: pointer;
    }

    b {
        font-weight: 600;
    }

    body {
        --very-dark-blue: hsl(200, 15%, 8%);
        --dark-grey: hsl(0, 0%, 52%);
        --background-color: hsl(0, 0%, 98%);
        --lighter-background-color: white;

        &.dark-theme {
            --background-color: #212E37;
            --lighter-background-color: #2B3743;
            --text-color: white;
        }
    }

    #app {
        font-family: 'Nunito Sans', sans-serif;
        background: var(--background-color);
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        min-height: 100vh;

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 50px;
            background: var(--lighter-background-color);
            color: var(--text-color);
            box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.1);

            @media (max-width: $mobile-breakpoint) {
                padding: 20px 30px;
            }

            .dark-toggle {
                display: flex;
                align-items: center;
                svg {
                    margin-right: 5px;
                }
            }
        }

        .container {
            flex: 1;
            padding: 0 50px 50px;

            @media (max-width: $mobile-breakpoint) {
                padding: 0 30px 30px;
            }

            .filter-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                padding: 50px 0;

                @media (max-width: $tablet-breakpoint) {
                    > * {
                        width: 100%;
                        &:not(:last-child) {
                            margin-bottom: 10px;
                        }
                    }
                }
                @media (max-width: $mobile-breakpoint) {
                    padding: 20px 0;
                }
            }
            .countries { 
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                grid-gap: 75px;

                @media (max-width: $tablet-breakpoint) {
                    grid-gap: 50px;
                }   
            }
        }
    }
</style>
