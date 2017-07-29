<template>
  <q-layout>
    <div slot="header"
         class="toolbar">
      <q-toolbar-title :padding="1">
        Orb Solution Todo List
      </q-toolbar-title>
    </div>
  
    <div class="layout-view">
      <q-search class="primary"
                v-model="search"></q-search>
      <div class="list">
      <center> 
      <a v-link="{ path: '/Add' }">Create Todo</a> 
      </center>
        <div v-for="i in filteredTasks"
             :key="i.id"
             class="item">
  
          <i class="item-primary">lightbulb_outline</i>
          <div class="item-content has-secondary">
            <div>{{i.title}}</div>
          </div>
  
          <div class="item-secondary">
            <q-fab classNames="primary"
                   icon="keyboard_arrow_left"
                   direction="left"
                   style="right: 18px; bottom: 18px;">
              <q-small-fab class="white"
                           icon="edit"
                           @click.native="onEdit(i.id)"></q-small-fab>
              <q-small-fab class="white"
                           @click.native="deleteItem(i.id)"
                           icon="delete">
              </q-small-fab>
            </q-fab>
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
      function filter(arrayInTaskList, Searchterm) {
        retv = [];
        for (var i = 0; i < arrayInTaskList.length; i++) {
          var title = arrayInTaskList[i]['title'].toLowerCase();
          if (title.indexOf(Searchterm.toLowerCase()) != -1) {
            retv.push(arrayInTaskList[i]);
          }
        }
        return retv;
      }
      if (this.search.length > 0) {
        var retv = filter(this.taskList, this.search);
        return retv;
      }

      return this.taskList
    }

  },


  methods: {
    onEdit(id) {
      console.log("edit:", id)
      this.$router.push(`/edit/${id}`)
    },

    deleteItem(id) {
      var self = this
      var task = _.find(this.taskList, { id: id })
      console.log(task)
      self.taskList.splice(self.taskList.indexOf(task), 1)
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
