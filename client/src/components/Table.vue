<template>
  <div class="Header row">
    <div class="col-md-10"><i class="fa fa-bars"></i> FRAMEWORKS</div>
    <div class="col-md-2">
      <button
        type="button"
        @click="openDialogue()"
        class="btn btn-primary"
        id="addButton"
      >
        <i class="fa-solid fa-circle-plus"></i> ADD
      </button>
    </div>
  </div>

  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">Deadline</th>
        <th scope="col">Priority</th>
        <th scope="col">Is Complete</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data">
        <td>{{ item.title }}</td>
        <td>{{ item.description }}</td>
        <td>{{ format(item.deadline) }}</td>
        <td>{{ item.priority }}</td>
        <td>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              @click="complete(item)"
            />
          </div>
        </td>
        <td>
          <div>
            <button
              class="btn btn-primary"
              v-if="item.isNotComplete"
              @click="openDialogue(item)"
            >
              <i class="fa-solid fa-pen-to-square"></i> Update
            </button>
          </div>
          <div>
            <button class="btn btn-danger" @click="remove(item.title)">
              <i class="fa-solid fa-circle-xmark"></i> Delete
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Header',
  data: (global) => ({}),
  props: ['data'],
  methods: {
    openDialogue(item) {
      let payload;
      if (!item) {
        payload = {
          title: '',
          deadline: '',
          priority: 'low',
          description: '',
          isNotComplete: true,
          new: true,
        };
      } else {
        payload = {
          title: item.title,
          deadline: item.deadline,
          priority: item.priority,
          description: item.description,
          isNotComplete: item.isNotComplete,
          new: item.new,
        };
      }
      this.$emit('openDialogue', payload);
    },
    complete(item) {
      item.isNotComplete = !item.isNotComplete;
    },
    remove(title) {
      this.$emit('remove', title);
    },
    format(deadline) {
      return moment(deadline, "YYYY-MM-DD").format("MM/DD/YYYY");
    },
  },
};
</script>

<style>
.Header {
  background-color: blue;
  color: white;
  padding: 25px;
}
</style>
