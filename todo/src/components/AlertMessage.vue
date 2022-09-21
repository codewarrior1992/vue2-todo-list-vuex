<template>
    <div class="position-fixed top-0 end-0 stack">
        <p class="bg-success text-white py-4 px-5 rounded" 
        v-for="(item, i) in messages" :key="i">
            {{ item.message }}
        </p>
    </div>
</template>
<script>
export default {
    data(){
        return {
            messages:[]
        }
    },
    methods:{
        showMessage(message){
            const timestamp = Math.floor(new Date() / 1000)
            this.messages.push({
                message,
                timestamp
            });
            this.removeMessage(timestamp)
        },
        removeMessage(timestamp){
            setTimeout(function(){
                this.messages = this.messages.filter((item) => !item.timestamp == timestamp)
            }.bind(this),3000)
        }
    },
    mounted(){
        this.$bus.$on('message',(val)=>{
            this.showMessage(val)
        })
    },
    beforeDestroy(){
        this.$bus.$off('message')
    }
}
</script>
<style scoped>
    .stack{
        z-index: 10;
    }
</style>