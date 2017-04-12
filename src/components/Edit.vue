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
                <input v-model="title"
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
            id: 0,
            title: ''
        }
    },

    methods: {
        edit(id) {
            var self = this




            var taskList = LocalStorage.get.item('tasks')
            var task = _.find(taskList, { id: this.id })
            console.log(id)
            if (self.title === '') {
                Toast.create('Warning!!!...You are trying to submit an empty field')
                return
            }

            if (task) {
                console.log(self.title)
                task.title = this.title
                LocalStorage.set('tasks', taskList)
                self.title = ""
            }


        }
    },

    mounted() {
        // console.log(this.$route.params.id)

        this.id = Number(this.$route.params.id)
        var taskList = LocalStorage.get.item('tasks')
        console.log(taskList)
        var task = _.find(taskList, { id: this.id })
        if (task) {
            this.title = task.title
        }
    }
}

</script>




