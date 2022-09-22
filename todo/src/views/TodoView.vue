<template>
  <div class="about">
    <!-- Loading -->
    <LoadingEffect :active.sync="isLoading"></LoadingEffect>

    <h1>{{ todo.title }}</h1>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        isLoading:false,
        obj : {}
      }
    },
    computed:{
      todo(){
        return this.obj
      },
    },
    methods:{
      async getTodo(){
        this.isLoading = true
        const response = await this.axios.get('http://127.0.0.1:3000/todo/get-one',
          {
            params : { _id : this.$route.params.id }
          }
        )
        this.obj = response.data.todo
        if(!response.data.success) return 
        this.isLoading = false;
      }
    },  
    created(){
      this.getTodo();
    }
  }
</script>
