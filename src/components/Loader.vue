// https://nzbin.github.io/three-dots/

<template>
    <div class="loader-container">
        <div class="loader"></div>
    </div>
</template>

<script>
export default {
    name: 'Loader'
}
</script>

<style lang="scss" scoped>
@keyframes dot-flashing {
    0% {
        opacity: 1;
    }
    50%, 
    100% {
        opacity: 0.2;
    }
}

.loader-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .loader {
        position: relative;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: var(--text-color);
        color: var(--text-color);
        animation: dot-flashing 1s infinite linear alternate;
        animation-delay: .5s;
        &:before, &:after {
            content: '';
            display: inline-block;
            position: absolute;
            top: 0;
            background-color: var(--text-color);
            color: var(--text-color);
            animation: dot-flashing 1s infinite alternate;
            width: 10px;
            height: 10px;
            border-radius: 5px;
        }
        &:before {
            left: -15px;
            animation-delay: 0s;
        }
        &:after {
            left: 15px;
            animation-delay: 1s;
        }
    }
}

</style>