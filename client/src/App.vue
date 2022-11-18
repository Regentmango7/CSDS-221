<template>
  <div id="app">
    <Table
      :data="tableData"
      @openDialogue="openDialogue($event)"
      @remove="remove($event)"
    />
    <transition name="fade">
      <Dialogue
        v-if="show"
        :rowList="tableData"
        :currentData="curData"
        @closeDialogue="closeDialogue($event)"
      />
    </transition>
  </div>
</template>

<script>
import Table from './components/Table.vue';
import Dialogue from './components/dialogue.vue';
import toastr from 'toastr';

export default {
  name: 'App',
  components: {
    Table,
    Dialogue,
  },
  data: (global) => ({
    picked: '',
    show: false,
    tableData: [],
    curData: {
      title: '',
      description: '',
      deadline: '',
      priority: 'Low',
      isNotComplete: true,
      new: true,
    },
  }),
  methods: {
    openDialogue(current) {
      this.curData = current;
      this.show = true;
    },
    closeDialogue(valid) {
      this.show = false;
      if (valid) {
        if (this.curData.new == true) {
          this.curData.new = false;
          this.tableData.push(this.curData);
          toastr.success('You have successfully added an item.');
        } else {
          this.tableData[
            this.tableData
              .map((object) => object.title)
              .indexOf(this.curData.title)
          ] = this.curData;
          toastr.success('You have successfully updated an item.');
        }
      }
      this.curData = {
        title: '',
        description: '',
        deadline: '',
        priority: 'Low',
        isNotComplete: true,
        new: true,
      };
    },
    remove(title) {
      if (this.tableData.map((object) => object.title).indexOf(title) > -1) {
        this.tableData.splice(
          this.tableData.map((object) => object.title).indexOf(title),
          1
        );
        toastr.success('You have successfully removed an item.');
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/*modals*/
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 400px; /*master width of modals*/
  margin: 40px auto 0;
  padding: 20px 30px;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
