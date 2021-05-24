<template>
    <div class="container">
        <div class="filter-container">
            <search v-model:value="searchFilter" :placeholder="'Search for a country...'"></search>
            <dropdown :defaultText="'Filter by Region'" :options="regions" @optionClick="updateRegionFilter"></dropdown>
        </div>
        
        <p v-if="!visibleCountries.length" class="text-center text-muted">No countries with the selected filters</p>

        <div v-if="visibleCountries.length" class="countries">
            <country v-for="country in visibleCountries" :key="country.alpha3Code" :details="country"></country>
        </div>
        <div v-if="paginationPageMax > 1" class="pagination">
            <a v-if="paginationPage > 0" class="btn btn-square" @click="paginationClick(paginationPage - 1)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </a>
            <a v-for="index in paginationPageMax" :key="index" class="btn btn-square" @click="paginationClick(index - 1)">
                <span :class="{ 'bold': (index - 1) === paginationPage }">{{ index }}</span>
            </a>
            <a v-if="paginationPage < (paginationPageMax - 1)" class="btn btn-square" @click="paginationClick(paginationPage + 1)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </a>
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
            darkTheme: false,
            paginationSize: 24,
            paginationPage: 0
        }
    },
    methods: {
        updateRegionFilter(region) {
            this.regionFilter = region;
            this.paginationPage = 0;
        },
        toggleDarkTheme() {
            this.darkTheme = !this.darkTheme;
            document.body.classList.toggle('dark-theme');
        },
        paginationClick(page) {
            this.paginationPage = page;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    computed: {
        ...mapState([
            'countries'
        ]),
        visibleCountries() { 
            return this.filteredCountries.slice(this.paginationPage * this.paginationSize, (this.paginationPage * this.paginationSize) + this.paginationSize);
        },
        filteredCountries() {
            return this.countries
                    .filter(country => this.regionFilter ? country.region === this.regionFilter : true)
                    .filter(country => country.name.toLowerCase().includes(this.searchFilter.toLowerCase()))
        },
        regions() {
            return [...new Set(this.countries.map(country => country.region))].filter(country => country !== '');
        },
        paginationPageMax() {
            return Math.ceil(this.filteredCountries.length / this.paginationSize);
        }
    },
    watch: {
        searchFilter () {
            this.paginationPage = 0;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../styles.scss";

.container {
    flex: 1;
    padding: 0 50px 50px;
    display: flex;
    flex-direction: column;

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
    .pagination {
        margin: 50px auto 0;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        a {
            &:hover {
                font-weight: 600;
                path {
                    stroke-width: 2.5;
                }
            }
            svg {
                width: 18px;
            }
            span.bold {
                font-weight: 800;
            }
        }
    }
}
</style>
