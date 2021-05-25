<template>
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
</template>

<script>

export default {
    name: 'DarkToggle',
    mounted () {
        this.matchMediaDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.darkTheme = localStorage.getItem('darkTheme');

        // if darkTheme isn't set in localStoarge then set to OS setting and listen for changes
        if (this.darkTheme === null) {
            this.matchMediaDark.addEventListener('change', this.handleOSThemeChange);

            if ((this.matchMediaDark && this.matchMediaDark.matches)) {
               this.darkTheme = true;
            }
        }
        // if darkTheme is set, then convert it's value to boolean as it's stored as string in localStorage
        else {
            this.darkTheme = this.darkTheme === 'true';
        }
    },
    data () {
        return {
            darkTheme: undefined,
            matchMediaDark: undefined
        }
    },
    methods: {
        toggleDarkTheme() {
            this.darkTheme = !this.darkTheme;

            localStorage.setItem('darkTheme', this.darkTheme);

            // stop listening to OS changes after user has chosen manually
            this.matchMediaDark.removeEventListener('change', this.handleOSThemeChange);
        },
        handleOSThemeChange(e) {
            this.darkTheme = e.matches;
        }
    },
    watch: {
        darkTheme () {
            if (this.darkTheme === true) {
                document.body.classList.add('dark-theme');
            }
            else {
                document.body.classList.remove('dark-theme');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../styles.scss";

.dark-toggle {
    display: flex;
    align-items: center;
    svg {
        margin-right: 5px;
    }
    @media (max-width: $tablet-breakpoint) {
        font-size: .9em;
        svg {
            width: 20px;
        }
    }
    @media (max-width: $mobile-breakpoint) {
        font-size: .8em;
        svg {
            width: 18px;
        }
    }
}
</style>
