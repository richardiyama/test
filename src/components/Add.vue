<template>
    <q-layout>
        <div slot="header"
             class="toolbar">
    
            <q-toolbar-title :padding="1">
                Add Todo
            </q-toolbar-title>
       
       </div>
        <div class="layout-view">
            <br>
            <br>
            
            <br>
            <br>
            <br>
            <div class="floating-label">
    
                <input v-model="task"
                       @keyup.enter="add"
                       required
                       class="full-width">
                <label>New Todo</label>
                <br>
                <br>
                <br>
                <center>
                    <button class="primary"
                            @click="add">
                        add
                    </button>
    
                    <button class="primary">
                        cancel
                    </button>
                </center>
            </div>
        </div>
    
    </q-layout>
</template>

<script>

import _ from 'lodash'
import Quasar, { Utils, Dialog, LocalStorage, Toast } from 'quasar'

var lastCount = 0
function counter() {
    lastCount += 1
    return lastCount
}

export default {
    data() {
        return {
            task: "",
            taskList: LocalStorage.get.item('tasks', []),

        }
    },

    methods: {

        add: function () {
            var self = this

            if (self.task == 0) {
                Toast.create('Warning!!!...You are trying to submit an empty field')
                return
            }

            self.taskList.push({
                id: counter(),
                title: self.task,
                status: 0
            })
            console.log(self.taskList)
            LocalStorage.set('tasks', self.taskList)
            self.task = ""

        }


    },
    mounted() {

        // create task store if not exist
        if (LocalStorage.has('tasks') === false) {
            LocalStorage.set('tasks', [])
        }
    }
}


</script>

<style>

</style>
