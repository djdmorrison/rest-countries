<template>
    <div class="country">
        <img :src="details.flag">
        <div class="details">
            <p class="name">{{ details.name }}</p>
            <p><b>Population:</b> {{ details.population }}</p>
            <p><b>Region:</b> {{ details.region }}</p>
            <p><b>Capital:</b> {{ details.capital }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Country',
    props: {
        details: {}
    }
}
</script>

<style scoped lang="scss">
    .country {
        background: white;
        border-radius: 5px;
        box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.05);
        img {
            width: 100%;
            height: 175px;
            object-fit: cover;
            border-radius: 5px 5px 0 0;
            box-shadow: 0 1px 1px 0px rgba(0, 0, 0, 0.05);
        }
        .details {
            padding: 20px;
            font-size: .9em;
            .name {
                font-weight: 800;
                font-size: 1.2em;
                margin-bottom: 10px;
            }
        }
    }

    p {
        color: var(--background);
    }
</style>
