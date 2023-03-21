<template>
  <div class="va-table-responsive">
    <table class="va-table va-table--hoverable">
      <thead>
        <tr>
          <th>Reminder</th>
          <th>Description</th>
          <th>Time</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reminder in reminders" :key="reminder.id">
          <td>{{ reminder.name }}</td>
          <td>{{ reminder.description }}</td>
          <td>{{ reminder.time }}</td>
          <td>
            <va-badge :text="reminder.status" :color="reminder.status" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ref, type Ref } from "vue";
import { defineComponent } from "vue";

const reminders = [
  {
    id: 1,
    name: "Eat breakfast",
    description: "today's breakfast is kaya toast",
    time: "8:00 AM",
    status: "enabled",
  },
  {
    id: 2,
    name: "Eat lunch",
    description: "today's lunch is chicken rice",
    time: "12:00PM",
    status: "enabled",
  },
  {
    id: 3,
    name: "Eat dinner",
    description: "today's dinner is hai di lao",
    time: "6:00 PM",
    status: "enabled",
  },
  {
    id: 4,
    name: "Shower",
    description: "remember to replace the body soap, it's running out",
    time: "7:00 PM",
    status: "enabled",
  },
];
</script>

<style lang="scss" scoped>
.va-table-responsive {
  overflow: auto;
}
</style>
