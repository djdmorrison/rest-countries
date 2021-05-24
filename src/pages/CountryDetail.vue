<template>
    <div class="container">
        <router-link to="/" class="btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5 12H6M6 12L12 6M6 12L12 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Home</span>
        </router-link>

        <div class="detail-container">
            <img :src="country.flag">
            <div class="detail">
                <h2>{{ country.name }}</h2>
                <div class="columns">
                    <div class="column">
                        <p><b>Native Name: </b>{{ country.nativeName }}</p>
                        <p><b>Population: </b>{{ country.population }}</p>
                        <p><b>Region: </b>{{ country.region }}</p>
                        <p><b>Sub Region: </b>{{ country.subregion }}</p>
                        <p><b>Capital: </b>{{ country.capital }}</p>
                    </div>
                    <div class="column">
                        <p><b>Top Level Domain: </b>{{ topLevelDomains }}</p>
                        <p><b>Currencies: </b>{{ currencies }}</p>
                        <p><b>Languages: </b>{{ languages }}</p>
                    </div>
                </div>

                <div>
                    <b>Border countries: </b>
                    <span v-if="!borders.length">No border countries</span>
                    <router-link class="btn btn-small"
                                 v-for="border in borders" 
                                 :key="border.alpha3Code" 
                                 :to="'/country/' + border.alpha3Code">
                        {{ border.name }}
                    </router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'CountryDetailPage',
    computed: {
        ...mapState([
            'countries'
        ]),
        country () {
            return this.countries.find(country => country.alpha3Code === this.$route.params.id)
        },
        borders () {
            return this.country.borders.map(countryCode => {
                return {
                    name: this.countries.find(country => country.alpha3Code === countryCode).name,
                    alpha3Code: countryCode
                };
            });
        },
        currencies () {
            return this.country.currencies.map(currency => currency.name).join(', ');
        },
        topLevelDomains () {
            return this.country.topLevelDomain.join(', ');
        },
        languages () {
            return this.country.languages.map(language => language.name).join(', ');
        },
    }
}
</script>

<style scoped lang="scss">
@import "../styles.scss";

.container {
    padding: 50px;
    @media (max-width: $tablet-breakpoint) {
        padding: 20px 30px;
    }
    .detail-container {
        margin-top: 50px;
        display: flex;
        @media (max-width: $tablet-breakpoint) {
            margin-top: 20px;
            flex-direction: column;
        }
        img {
            width: 40%;
            margin: 0 75px 50px 0;
            object-fit: contain;
            object-position: top;
            @media (max-width: $tablet-breakpoint) {
                width: 100%;
                max-width: 400px;
                margin: 0 0 25px;
            }
            @media (max-width: $mobile-breakpoint) {
                max-width: 100%;
            }
        }
        .detail {
            width: 100%;
            color: var(--text-color);
            font-size: .9em;
            h2 {
                margin-bottom: 20px;
            }
            .columns {
                display: flex;
                margin-bottom: 50px;
                .column {
                    width: 50%;
                    &:not(:last-of-type) {
                        margin-right: 10px;
                    }
                }
                @media (max-width: $tablet-breakpoint) {
                    margin-bottom: 25px;
                }
            }
            .btn {
                margin-bottom: 10px;
            }
        }
    
    }
}
</style>
