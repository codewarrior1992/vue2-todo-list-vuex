import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import todoModules from './todo.js'

export default new Vuex.Store({
  strict : true,
  state: {
    isLoading : false,
    messages : [],
    catchObj:{}
  },
  actions: {
    updateLoading(context,payload){
      context.commit('LOADING',payload)
    },
    showMessage(context, payload){
      context.commit('ADD_MESSAGE',payload)
    },
    removeMessage(context, payload){
        setTimeout(function(){
              context.commit('REMOVE_MESSAGE',payload)
        }.bind(this),3000)
    },
    openModal(context,payload){
      context.commit('OPEN_MODAL',payload)
    }
  },
  mutations: {
    LOADING(state, payload){
      state.isLoading = payload
    },
    ADD_MESSAGE(state,payload){
      state.messages.push(payload)
    },
    REMOVE_MESSAGE(state,payload){
      state.messages = state.messages.filter((item) => !item.timestamp == payload)
    },
    OPEN_MODAL(state, payload){
      state.catchObj = payload
    }
  }, 
  getters: {
    messages(state){
      return state.messages
    },
    isLoading(state){
      return state.isLoading
    },
    catchObj(state){
      return state.catchObj
    }
  },
  modules: {
    todoModules
  }, 
})
