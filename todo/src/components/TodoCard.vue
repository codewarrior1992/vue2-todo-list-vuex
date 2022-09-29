<!-- eslint-disable vue/no-duplicate-attributes -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="card">
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
                <button type="button" class="btn btn-secondary" @click="openModal" data-bs-toggle="modal" data-bs-target="#updateModal">更新</button>
                <button type="button" class="btn btn-danger" @click="openModal"  data-bs-toggle="modal" data-bs-target="#removeModal">刪除</button>
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
        openModal(){
            this.$store.dispatch('openModal',this.todo)
        },
        async isCompleted(val){
            this.$store.dispatch('updateLoading',true);

            const obj = { completed : val, _id  : this.todo._id} ;
            const message = await this.$store.dispatch('todoModules/isCompleted', obj);
        
            const timestamp = Math.floor(Date.now() / 1000);
            const payload = { message, timestamp };

            this.$store.dispatch('todoModules/getList');
            this.$store.dispatch('showMessage', payload);
            this.$store.dispatch('removeMessage',payload);
            this.$store.dispatch('updateLoading',false)
        }
    },
}
</script>
