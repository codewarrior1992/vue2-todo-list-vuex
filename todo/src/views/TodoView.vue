<template>
  <div class="about">
    <h1>{{ obj.title }}</h1>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        obj : {}
      }
    },
    async created(){
      console.log(this.$route.params.id)
      const response = await this.axios.get('http://127.0.0.1:3000/todo/get-one',
          {
            params : { _id : this.$route.params.id }
          }
      )
      this.obj = response.data.todo
    }
  }
</script>
