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
        <TodoCard :todo="todo" @call-get-all="getAll"/>
      </li>
    </ul>

    <!-- Todo Modal -->
    <TodoModal @call-get-all="getAll"/>
  </div>
</template>

<script>
import TodoCard from '@/components/TodoCard.vue';
import AlertMessage from '@/components/AlertMessage.vue';
import TodoModal from '@/components/TodoModal.vue';
import FilterList from '../components/FilterList.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    TodoCard,
    AlertMessage,
    TodoModal,
    FilterList
  },
  data(){
    return {
      todo : '',
      classify : null
    }
  },
  computed:{
    // eslint-disable-next-line vue/return-in-computed-property
    todoArr(){
      switch(this.classify){
        case true : {
          return this.list.filter((item)=> item.completed)
        } 
        case false : {
          return this.list.filter((item)=> !item.completed)
        } 
        case null : {
          return this.list
        } 
      }
    },
    ...mapGetters(['isLoading']),
    ...mapGetters('todoModules',['list'])
  },
  methods:{
    todoClassify(val){ this.classify = val },
    async create(){
      if(this.todo === '') return
      this.$store.dispatch('updateLoading',true)
      const todo = {title : this.todo , completed : false};
      const message = await this.$store.dispatch('todoModules/createTodo', todo);
      const timestamp = Math.floor(Date.now() / 1000);
      const payload = { message, timestamp }

      this.$store.dispatch('showMessage', payload);
      this.$store.dispatch('removeMessage', payload);

      this.todo = '';
      this.getList();
      this.$store.dispatch('updateLoading',false)
    },
    async getAll(){
      this.$store.dispatch('updateLoading',true)
      this.getList()
      this.$store.dispatch('updateLoading',false)
    },
    ...mapActions('todoModules',['getList'])
  },
  async created(){
    await this.getAll();
  }
}
</script>
