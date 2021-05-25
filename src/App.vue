<template>
    <app-header></app-header>
    <loader v-if="isLoading"></loader>
    <router-view v-if="!isLoading"></router-view>
</template>

<script>
import store from './store'
import { actions } from './store/mutation-types';

import AppHeader from './components/Header.vue';
import Loader from './components/Loader.vue';
import { mapState } from 'vuex';

export default {
    name: 'App',
    components: {
        AppHeader,
        Loader
    },
    created () {
        store.dispatch(actions.INIT_STORE);
    },
    data () {
        return {
            isLoading: true
        }
    },
    watch: {
        countries: function() {
            this.isLoading = false;
        }
    },
    computed: {
        ...mapState([
            'countries',
        ])
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
    
    a {
        cursor: pointer;
        text-decoration: none;
        color: var(--text-color);
    }

    b {
        font-weight: 600;
    }

    p {
        color: var(--text-color);
    }

    .btn {
        background: var(--lighter-background-color);
        box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.05);
        padding: 10px 15px;
        display: inline-flex;
        align-items: center;
        font-size: .9em;
        margin-bottom: 10px;
        svg + * {
            margin-left: 8px;
        }
        &:not(:last-of-type) {
            margin-right: 10px;
        }
        &.btn-small {
            padding: 5px 10px;
        }
        &.btn-square {
            width: 40px;
            height: 40px;
            justify-content: center;
            padding: 0;
        }
    }

    .text-center {
        align-self: center;
        text-align: center;
    }
    .text-muted {
        opacity: .5;
    }

    body {
        --background-color: hsl(0, 0%, 98%);
        --lighter-background-color: white;
        --text-color: black;

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
    }
</style>
