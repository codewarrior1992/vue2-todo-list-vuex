import axios from 'axios';

export default {
    strict : true,
    namespaced : true,
    state: {
        list :[],
        todo : {},
    },
    actions: {
        async getList(context){
            const response = await axios.get('http://127.0.0.1:3000/todo/all');
            if(!response.data.success) return 
            context.commit('LIST', response.data.list)
        },
        async getTodo(context,payload){
            const response = await axios.get('http://127.0.0.1:3000/todo/get-one',payload);
            if(!response.data.success) return 
            context.commit('TODO',response.data.todo)
        },
        async createTodo(context,payload){
            const response = await axios.post('http://127.0.0.1:3000/todo/create',payload);
            if(response.data.success) return response.data.message
        },
        async updateTodo(context,payload){
            const response = await axios.patch('http://127.0.0.1:3000/todo/update', payload);
            if(response.data.success) return response.data.message
        },
        async removeTodo(context,payload){
            const response = await axios.post('http://127.0.0.1:3000/todo/delete', payload);
            if(response.data.success) return response.data.message
        },
        async isCompleted(context, payload){
            const response = await axios.patch('http://127.0.0.1:3000/todo/checked', payload);
            if(response.data.success) return response.data.message
        }
    },
    mutations: {
        LIST(state,payload){
            state.list = payload
        },
        TODO(state,payload){
            state.todo = payload
        }
    }, 
    getters: {
        list (state){
            return state.list;
        },
        todo(state){
            return state.todo
        },
    },
}
