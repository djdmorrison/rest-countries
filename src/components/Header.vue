<template>
    <header>
        <router-link to="/"><h1>Where in the World?</h1></router-link>
        <dark-toggle></dark-toggle>
    </header>
</template>

<script>
import DarkToggle from "./DarkToggle.vue";

export default {
    name: 'Header',
    components: {
        DarkToggle
    }
}
</script>

<style lang="scss" scoped>
@import "../styles.scss";

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;
    background: var(--lighter-background-color);
    color: var(--text-color);
    box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.1);

    @media (max-width: $tablet-breakpoint) {
        padding: 20px 30px;

        h1 {
            font-size: 1.2em;
        }
    }

    @media (max-width: $mobile-breakpoint) {
        h1 {
            font-size: 1em;
        }
    }
}
</style>
