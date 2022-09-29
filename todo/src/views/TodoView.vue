<template>
  <div class="about">
    <!-- Loading -->
    <LoadingEffect :active.sync="isLoading"></LoadingEffect>

    <h1>{{ todo.title }}</h1>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
  export default{
    data(){
      return{
        isLoading:false,
      }
    },
    computed:{
      ...mapGetters('todoModules',['todo'])
    },
    methods:{
      async getTodo(){
        this.$store.dispatch('updateLoading',true);
        const payload = {params : { _id : this.$route.params.id }};
        this.$store.dispatch('todoModules/getTodo', payload)
        this.$store.dispatch('updateLoading',false);
      }
    },  
    created(){
      this.getTodo();
    }
  }
</script>
