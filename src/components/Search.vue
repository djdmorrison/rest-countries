<template>
<div class="input-wrapper">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5 15.5L19 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <input type="text" :placeholder="placeholder" :value="value" @input="$emit('update:value', $event.target.value)">
</div>
</template>

<script>
export default {
    name: 'Search',
    props: {
        placeholder: String,
        value: String
    },
    emits: ['update:value']
}
</script>

<style scoped lang="scss">
.input-wrapper {
    padding: 10px 20px;
    background: var(--lighter-background-color);
    color: var(--text-color);
    box-shadow: 0px 2px 8px -2px rgb(0 0 0 / 10%);
    border-radius: 5px;
    display: flex;
    align-items: center;
    width: 250px;
    input {
        background: var(--lighter-background-color);
        color: var(--text-color);
        padding: 10px 20px;
        border: none;
        flex: 1;
        &:focus {
            outline: none;
        }
    }
}
   
</style>
