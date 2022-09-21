<template>
  <div>
    <!-- Update Modal -->
    <div class="modal fade" id="updateModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ catchObj.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <span class="input-group-text">請輸入代辦事項</span>
              <input type="text" class="form-control"
              v-model.trim="catchTodo">
              <button class="btn btn-outline-secondary" type="button"
              @click="update" data-bs-dismiss="modal"
              >送出</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Remove Modal -->
    <div class="modal fade" id="removeModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="d-flex justify-content-between align-items-center">
              <h2 class="m-0">{{ catchObj.title }}</h2>
              <button class="btn btn-outline-danger" type="button"
                @click="remove" data-bs-dismiss="modal"
                >確定刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      catchObj : {},
      catchTodo : ''
    }
  },
  methods:{
    async update(){
      if(this.catchTodo ==='') return;

      const obj = { title : this.catchTodo, _id  : this.catchObj._id};
      const response = await this.axios.patch('http://127.0.0.1:3000/todo/update', obj);
      
      if(!response.data.success) return 
      this.$emit('callGetAll');
      this.$bus.$emit('message',response.data.message);
      this.reset();
    },
    async remove(){
      const obj = { _id  : this.catchObj._id};
      const response = await this.axios.post('http://127.0.0.1:3000/todo/delete', obj);
      if(!response.data.success) return 
      this.$emit('callGetAll');
      this.$bus.$emit('message',response.data.message);
      this.reset();
    },
    reset(){
      this.catchObj = {};
      this.catchTodo = '';
    },
  },
  created(){
    this.$bus.$on('open-update-modal', (todo)=>{
      this.catchObj = todo
      this.catchTodo = todo.title
    }),
    this.$bus.$on('open-remove-modal', (todo)=>{
      this.catchObj = todo
      this.catchTodo = todo.title
    })
  },
  beforeDestroy(){
    this.reset();
    this.$bus.$off('open-update-modal');
    this.$bus.$off('open-remove-modal');
  }
}
</script>