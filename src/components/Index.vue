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
      <q-search class="orange" 
                v-model="search"></q-search>
      <div class="list">
        <div v-for="i in filteredTasks"
             :key="i.id"
             class="item">
  
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
import Quasar, { Utils, Dialog, LocalStorage, Toast } from 'quasar'

var lastCount = 0
function counter() {
  lastCount += 1
  return lastCount
}

export default {
  data() {
    return {
      search: '',
      taskList: LocalStorage.get.item('tasks', []),
      

    }
  },

  computed: {
    filteredTasks: function () {
    
      if (this.search.length > 0) {
        var retv = _.filter(this.taskList, { title: this.search})
    
        //console.log(matches_array)
        return retv
      
      }

      return this.taskList
    }

  },

  methods: {
     
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
            preventClose: true,

            handler(data, close) {

              if (data.task == 0) {
                Toast.create('Warning!!!...You are trying to submit an empty field')
                return
              }
              close(() => {
                var task = { id: counter(), title: data.task, status: 0 }
                self.taskList.push(task)
                LocalStorage.set('tasks', self.taskList)

              })



            }
          }
        ]
      })

    },

    edit(id) {
      var self = this
      // var task = _.find(this.taskList, {id:id})
      var task = {}
      this.taskList.forEach(function (el) {
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
            preventClose: true,
            handler(data, close) {
              if (data.task == 0) {
                Toast.create('Warning!!!...You are trying to submit an empty field')
                return
              }

              close(() => {
                task.title = data.task
                LocalStorage.set('tasks', self.taskList)
              })


            }
          }
        ]
      })
    },


    deleteItem(id) {
      var self = this
      var task = {}
      this.taskList.forEach(function (el) {
        if (el.id == id) {
          task = el
          console.log(task)
          self.taskList.splice(self.taskList.indexOf(task), 1)
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