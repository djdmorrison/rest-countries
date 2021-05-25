<template>
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
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        dataLength: Number,
        paginationSize: Number,
        paginationPage: Number
    },
    data () {
    },
    methods: {
        paginationClick(page) {
            this.$emit('paginationClick', page);

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    computed: {
        paginationPageMax() {
            return Math.ceil(this.dataLength / this.paginationSize);
        }
    }
}
</script>

<style scoped lang="scss">
.pagination {
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
</style>
