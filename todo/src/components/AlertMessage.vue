<template>
    <div class="position-fixed top-0 end-0 stack">
        <p class="bg-success text-white py-4 px-5 rounded" 
        v-for="(item, i) in messages" :key="i">
            {{ item.message }}
        </p>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return {}
    },
    computed:{
        ...mapGetters(['messages'])
    }
}
</script>
<style scoped>
    .stack{
        z-index: 10;
    }
</style>