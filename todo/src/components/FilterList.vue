<template>
    <div class="card-header mb-3">
        <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
            <a class="nav-link" href="#" 
                @click.prevent="tab = null"
                :class="{active : tab == null}">全部</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#"
                @click.prevent="tab = false"
                :class="{active : tab == false}">進行中</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#"
                @click.prevent="tab = true"
                :class="{active : tab == true}"
                >已完成</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props : {
        list : {
            type : Array,
        }
    },
    data(){
        return {
            tab : null
        }
    },
    watch:{
        tab(val){
            switch(val){
                case true : {
                    this.$emit('currentTab', true)
                }
                break;
                case false : {
                    this.$emit('currentTab', false)
                }
                break;
                case null : 
                    this.$emit('currentTab', null)
                break;
            }
        }
    }
}
</script>
