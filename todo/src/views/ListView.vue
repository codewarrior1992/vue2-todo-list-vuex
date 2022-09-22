<!-- eslint-disable vue/no-dupe-keys -->
<template>
  <div class="container my-5">
    <!-- Loading -->
    <LoadingEffect :active.sync="isLoading"></LoadingEffect>

    <!-- Message -->
    <AlertMessage />

    <!-- Input -->
    <div class="input-group mb-3">
      <span class="input-group-text">請輸入代辦事項</span>
      <input type="text" class="form-control" v-model.trim="todo" @keyup.enter="create">
      <button class="btn btn-secondary" @click.prevent="create">送出</button>
    </div>

    <!-- Filter -->
    <FilterList @currentTab="todoClassify"/>

    <!-- List -->
    <ul class="row g-3">
      <li class="col-lg-3 col-md-4 col-sm-6" v-for="(todo,i) in todoArr" :key="i">
        <TodoCard :todo="todo" @callGetAll="getAll"/>
      </li>
    </ul>

    <!-- Todo Modal -->
    <TodoModal @callGetAll="getAll"/>
  </div>
</template>

<script>
import TodoCard from '@/components/TodoCard.vue';
import AlertMessage from '@/components/AlertMessage.vue';
import TodoModal from '@/components/TodoModal.vue';
import FilterList from '../components/FilterList.vue';

export default {
  components: {
    TodoCard,
    AlertMessage,
    TodoModal,
    FilterList
  },
  data(){
    return {
      // isLoading : false,
      todo : '',
      list:[],
      classify : null
    }
  },
  computed:{
    // eslint-disable-next-line vue/return-in-computed-property
    todoArr(){
      switch(this.classify){
        case true : {
          return [...this.list].filter((item)=> item.completed)
        } 
        case false : {
          return [...this.list].filter((item)=> !item.completed)
        } 
        case null : {
          return this.list
        } 
      }
    },
    isLoading(){
      return this.$store.state.isLoading;
    }
  },
  methods:{
    async create(){
      if(this.todo === '') return
      const todo = {title : this.todo , completed : false}
      const response = await this.axios.post('http://127.0.0.1:3000/todo/create',todo);
      if(!response.data.success) return
      this.$bus.$emit('message',response.data.message);
      this.todo = ''
      this.getAll();
    },
    async getAll(){
      this.$store.dispatch('updateLoading', true)
      const response = await this.axios.get('http://127.0.0.1:3000/todo/all');
      if(!response.data.success) return 
      this.list = response.data.list
      this.$store.dispatch('updateLoading', false)
    },
    todoClassify(val){ this.classify = val }
  },
  async created(){
    await this.getAll();
  }
}
</script>
