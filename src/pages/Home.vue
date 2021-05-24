<template>
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

import Country from '../components/Country.vue';
import Search from '../components/Search.vue';
import Dropdown from '../components/Dropdown.vue';

export default {
    name: 'HomePage',
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

<style lang="scss" scoped>
@import "../styles.scss";

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
</style>
