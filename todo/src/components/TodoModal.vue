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
import { mapActions, mapGetters } from 'vuex';
export default {
  data(){
    return {
      isLoading : false,
      catchTodo : ''
    }
  },
  methods:{
    async update(){
      if(this.catchTodo ==='') return;
      this.$store.dispatch('updateLoading',true)

      const obj = { title : this.catchTodo, _id  : this.catchObj._id};
      const message = await this.$store.dispatch('todoModules/updateTodo',obj)
      const timestamp = Math.floor(Date.now() / 1000);
      const payload = { message, timestamp }

      this.getList()
      this.$store.dispatch('showMessage',payload);
      this.$store.dispatch('removeMessage',payload);
      this.$store.dispatch('updateLoading',false)

      this.catchTodo = '';
    },
    async remove(){
      this.$store.dispatch('updateLoading',true);

      const obj = { _id  : this.catchObj._id};
      const message = await this.$store.dispatch('todoModules/removeTodo',obj);
      const timestamp = Math.floor(Date.now() / 1000);
      const payload = { message, timestamp };

      this.getList()
      this.$store.dispatch('showMessage', payload);
      this.$store.dispatch('removeMessage',payload);
      this.$store.dispatch('updateLoading',false)
    },
    ...mapActions('todoModules',['getList'])
  },
  computed:{
    ...mapGetters(['catchObj'])
  }
}
</script>