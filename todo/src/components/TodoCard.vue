<!-- eslint-disable vue/no-duplicate-attributes -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="card">
        <!-- Loading -->
        <LoadingEffect :active.sync="isLoading"></LoadingEffect>

        <!-- Card -->
        <div class="card-header">
            <h2>
                <router-link :to="`/${todo._id}`">
                    {{ todo.title }}
                </router-link>
            </h2>
        </div>
        <div class="card-body">
            <label :for="todo._id" v-if="todo.completed">
                <input class="form-check-input text-decoration-line-through" 
                type="checkbox" :id="todo._id"
                :checked="todo.completed"
                @click.prevent="isCompleted(!todo.completed)"
                /> 完成
            </label>
            <label :for="todo._id" v-else>
                <input class="form-check-input text-decoration-line-through"
                type="checkbox" :id="todo._id"
                :checked="todo.completed"
                @click.prevent="isCompleted(!todo.completed)"
                /> 未完成
            </label>
        </div>
        <div class="card-footer">
            <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-secondary" @click="openUpdateModal" data-bs-toggle="modal" data-bs-target="#updateModal">更新</button>
                <button type="button" class="btn btn-danger" @click="openRemoveModal"  data-bs-toggle="modal" data-bs-target="#removeModal">刪除</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props :{
        todo:{
            type: Object,
            default : () => {}
        }
    },
    data(){
        return {
            isLoading : false,
            completed : 0,
        }
    },
    methods:{
        openUpdateModal(){
            this.$bus.$emit('open-update-modal', this.todo)
        },
        openRemoveModal(){
            this.$bus.$emit('open-remove-modal', this.todo)
        },
        async isCompleted(val){
            this.isLoading = true;
            const obj = { completed : val, _id  : this.todo._id} ;
            const response = await this.axios.patch('http://127.0.0.1:3000/todo/checked', obj);
            if(!response.data.success) return 
            this.$emit('call-get-all');
            this.$bus.$emit('message',response.data.message);
            this.isLoading = false;
        }
    },
}
</script>
