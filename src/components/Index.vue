<template>
  <q-layout>
    <div slot="header"
         class="toolbar">
      <q-toolbar-title :padding="1">
        Orb Solution Todo List
      </q-toolbar-title>
      <button @click="add">
        <i>note_add</i>
      </button>
    </div>
  
    <div class="layout-view">
    <q-search class="orange"  v-model="searchModel"></q-search>
      <div class="list">
        <div v-for="i in filteredTasks()" :key="i.id" class="item">

          <i class="item-primary">lightbulb_outline</i>
          <div class="item-content has-secondary">
            <div>{{i.title}}</div>
          </div>
  
          <div class="item-secondary">
            <i slot="target">
                more_vert
                <q-popover :ref="'popover'">
                  <div class="list">
                    <div class="item item-link" @click="edit(i.id)">
                      <div class="item-content">Edit</div>
                    </div>
                    <div class="item item-link" @click="deleteItem(i.id)">
                      <div class="item-content">Delete</div>
                    </div>
                  </div>
                </q-popover>
              </i>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import _ from 'lodash'
import Quasar, { Utils, Dialog,LocalStorage } from 'quasar'

var lastCount = 0 
function counter () {
  lastCount += 1
  return lastCount
}

export default {
  data() {
    return {
      searchs: '',
      taskList: LocalStorage.get.item('tasks',[]),
      searchModel: ""
    
    }
  },


  methods: {
    filteredTasks() {
      if (this.searchs.length > 0) {
        retv = _.filter(this.taskList, { label: this.searchModel })
        return retv
      }

      return this.taskList
    },

    add() {
      var self = this
      Dialog.create({
        title: 'New task',
        form: {
          task: {
            type: 'textbox',
            label: 'My task',
            model: ''
          }
        },

        buttons: [
          'Delete',
          {
            label: 'Create',
            handler(data) {

              if(data.task == 0){
                alert("Warning!!!...You are trying to submit an empty field")
              }

              else if(data.task != 0){
              var task = {id:counter(), title: data.task, status: 0}
              self.taskList.push(task)
              LocalStorage.set('tasks',self.taskList)
              alert("You are creating a new task..Tick to continue")
              }
              
              
            }
          }
        ]
      })

    },

    edit(id) {
      var self = this
      // var task = _.find(this.taskList, {id:id})
      var task = {}
      this.taskList.forEach(function(el) {
        if (el.id === id) {
          task = el
        }
      })

      Dialog.create({
        title: 'Edit task',
        form: {
          task: {
            type: 'textbox',
            label: 'Edit Task',
            model: task.title
          }
        },

        buttons: [
          'Delete',
          {
            label: 'Update',
            handler(data) {
                if(data.task == 0){
                alert("Warning!!!...You are trying to submit an empty field")
              }
               
               else if(data.task != 0){
              task.title = data.task
               LocalStorage.set('tasks', self.taskList)
              //self.taskList.push(task.title)
              //LocalStorage.set('tasks',task.title)
               alert("You are updating..Tick to continue")
              }
              
              
            }
          }
        ]
      })
    },


    deleteItem(id) {
      var self = this
      var task = {}
      this.taskList.forEach(function(el) {
        if(el.id == id){
          task = el
          console.log(task)
          self.taskList.splice(self.taskList.indexOf(task),1)
          LocalStorage.set('tasks', self.taskList)
      
          }
          
      })
    
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