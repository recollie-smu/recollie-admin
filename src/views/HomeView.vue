<script lang="ts" setup>
import { deleteReminder, getReminder, getReminders } from "@/apis/supabase";
import type { Reminder, ReminderData } from "@/types/reminder";
import dayjs from "dayjs";
import { onBeforeMount, ref, type Ref } from "vue";
import { defineComponent } from "vue";

const reminders: Ref<Reminder[]> = ref([]);
const removeReminder = async () => {
  await deleteReminder(reminder.id);
};

onBeforeMount(async () => {
  reminders.value = await getReminders();
});
</script>

<template>
  <div class="va-table-responsive">
    <table class="va-table va-table--hoverable">
      <thead>
        <tr>
          <th class="">Reminder</th>
          <th>Description</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="reminder in reminders"
          :key="reminder.id"
          class="flex items-center"
        >
          <td>{{ reminder.name }}</td>
          <td>{{ reminder.description }}</td>
          <td>{{ reminder.time }}</td>
          <td>
            <va-button
              icon="clear"
              color="danger"
              class="mb-2"
              @click="removeReminder(reminder)"
            >
              Delete
            </va-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.va-table-responsive {
  overflow: auto;
}
</style>
