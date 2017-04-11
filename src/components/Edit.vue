<template>
    <q-layout>
        <div slot="header"
             class="toolbar">
    
            <q-toolbar-title :padding="1">
                Edit Todo
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
                       @keyup.enter="edit"
                       required
                       class="full-width">
                <label>Edit Todo</label>
                <br>
                <br>
                <br>
                <center>
                    <button class="primary"
                            @click="edit">
                        update
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
import Quasar, { Utils, LocalStorage, Toast } from 'quasar'

export default {
    data() {
        return {
    
            taskList: LocalStorage.get.item('tasks', []),
        }


    },





    methods: {
        edit: function (id) {
            var self = this
            // var task = _.find(this.taskList, {id:id})
            var task = {}
            this.taskList.forEach(function (el) {
                if (el.id === id) {
                    task = el
                }
            })

            if (self.task == 0) {
                Toast.create('Warning!!!...You are trying to submit an empty field')
                return
            }


            task.title = self.task
            LocalStorage.set('tasks', self.taskList)

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




