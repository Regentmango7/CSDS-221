<template>
  <div class="modal-mask" transition="modal">
    <!--background shade-->
    <div
      style="
        width: 450px;
        text-align: center;
        margin: calc(40vh) auto auto auto;
      "
    >
      <!--modal props-->

      <div class="" style="background-color: blue; padding: 20px; color: white">
        <div v-if="currentData.new">
          <i class="fa-solid fa-circle-plus"></i> Add Task
        </div>
        <div v-else>
          <i class="fa-solid fa-pen-to-square"></i> Edit Task:
          {{ currentData.title }}
        </div>
      </div>
      <div style="background-color: white">
        <div class="row" v-if="currentData.new">
          <div class="col-md-12">
            <label></label>
            <input
              type="text"
              v-model="currentData.title"
              placeholder="Title"
              class="form-control"
              :class="{ 'is-invalid': titleInvalid }"
            />
            <div v-if="titleInvalid" style="color: red">
              Title must be unique and not empty
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <label></label>
            <input
              type="text"
              v-model="currentData.description"
              class="form-control"
              :class="{ 'is-invalid': descriptionInvalid }"
              placeholder="Description"
            />
            <div v-if="descriptionInvalid" style="color: red">
              Description must not be empty
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <label></label>
            <input
              type="date"
              class="form-control"
              :class="{ 'is-invalid': deadlineInvalid }"
              v-model="currentData.deadline"
            />
          </div>
        </div>

        <div class="form-group">
          <div class="form-check" id="priority">
            <div class="row">
              <label for="priority" class="col-md-1">Priority:</label>
            </div>
            <div class="row">
              <!--Low Radio-->
              <div class="form-group col-md-2">
                <input
                  class="form-check-input"
                  type="radio"
                  name="priority"
                  id="low"
                  value="Low"
                  v-model="currentData.priority"
                  checked
                />
                <label class="form-check-label" for="low">Low</label>
              </div>
              <!--Med Radio-->
              <div class="form-group col-md-2">
                <input
                  class="form-check-input"
                  type="radio"
                  name="priority"
                  id="med"
                  value="Med"
                  v-model="currentData.priority"
                />
                <label class="form-check-label" for="med">Med</label>
              </div>
              <!--High Radio-->
              <div class="form-group col-md-2">
                <input
                  class="form-check-input"
                  type="radio"
                  name="priority"
                  id="high"
                  value="High"
                  v-model="currentData.priority"
                />
                <label class="form-check-label" for="high">High</label>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-primary" style="margin: 5px" @click="submit()">
          <div v-if="currentData.new">
            <i class="fa-solid fa-circle-plus"></i> Add
          </div>
          <div v-else><i class="fa-solid fa-pen-to-square"></i> Edit</div>
        </button>
        <button
          @click="closeDialogue()"
          style="margin: 5px"
          class="btn btn-danger"
        >
          <i class="fa-solid fa-ban"></i> Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialogue',
  props: ['rowList', 'currentData'],
  data: (global) => ({
    titleInvalid: false,
    descriptionInvalid: false,
    deadlineInvalid: false,
    priorityInvalid: false,
  }),
  methods: {
    submit() {
      let valid = true;

      if (
        (this.currentData.new &&
          this.rowList
            .map((object) => object.title)
            .includes(this.currentData.title)) ||
        this.currentData.title == ''
      ) {
        valid = false;
        this.titleInvalid = true;
      } else {
        this.titleInvalid = false;
      }

      if (!this.currentData.description) {
        this.descriptionInvalid = true;
        valid = false;
      } else {
        this.descriptionInvalid = false;
      }

      if (!this.currentData.deadline) {
        this.deadlineInvalid = true;
        valid = false;
      } else {
        this.deadlineInvalid = false;
      }

      if (valid) {
        this.closeDialogue(valid);
      }
    },
    closeDialogue(valid) {
      this.$emit('closeDialogue', valid);
      this.titleInvalid = false;
      this.descriptionInvalid = false;
      this.deadlineInvalid = false;
      this.priorityInvalid = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
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
