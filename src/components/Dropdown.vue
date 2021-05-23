<template>
<div class="dropdown-wrapper">
    <div class="dropdown" @click="dropdownOpen = !dropdownOpen">
        <span class="clear-icon" v-if="chosenOption" @click.stop="clearChosenOption()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.17218 14.8284L12.0006 12M14.829 9.17157L12.0006 12M12.0006 12L9.17218 9.17157M12.0006 12L14.829 14.8284" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
        <span class="dropdown-text">{{ dropdownText }}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
    <ul v-if="dropdownOpen" class="options">
        <li v-for="option in options" :key="option" @click="optionClick(option)" class="option">
            {{ option }}
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'Dropdown',
    props: {
        defaultText: String,
        options: Array
    },
    data () {
        return {
            dropdownOpen: false,
            chosenOption: undefined
        }
    },
    methods: {
        optionClick(option) {
            this.chosenOption = option;
            this.dropdownOpen = false;
            this.$emit('optionClick', option);
        },
        clearChosenOption() {
            this.chosenOption = undefined;
            this.dropdownOpen = false;
            this.$emit('optionClick', undefined);
        }
    },
    computed: {
        dropdownText () {
            return this.chosenOption ? this.chosenOption : this.defaultText;
        }
    }
}
</script>

<style scoped lang="scss">
.dropdown-wrapper {
    position: relative;
    font-size: .9em;
    width: 200px;
    cursor: pointer;
    .dropdown, .options {
        background: var(--lighter-background-color);
        color: var(--text-color);
        box-shadow: 0 0px 5px 0px rgba(0, 0, 0, 0.1);
        padding: 10px 15px;
        border-radius: 5px;
    }
    .dropdown {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .clear-icon {
            height: 24px;
            &:hover {
                cursor: pointer;
                font-weight: bold;
            }
        }
        .dropdown-text {
            flex: 1;
            padding: 0 5px;
        }
    }
    .options {
        list-style: none;
        position: absolute;
        margin-top: 5px;
        width: 100%;
        .option {
            cursor: pointer;
            &:hover {
                font-weight: 600;
            }
            &:not(:last-of-type) {
                margin-bottom: 5px;
            }
        }
    }
}

</style>
