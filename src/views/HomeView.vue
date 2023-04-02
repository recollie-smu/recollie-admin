<script lang="ts" setup>
import { deleteReminder, getReminders } from "@/apis/supabase";
import type { Reminder } from "@/types/reminder";
import dayjs from "dayjs";
import { onBeforeMount, ref, type Ref } from "vue";
import { useRouter } from "vue-router";

const reminders: Ref<Reminder[]> = ref([]);
const router = useRouter();
const removeReminder = async (reminderId: number) => {
  await deleteReminder(reminderId);
  reminders.value = await getReminders();
};

const editReminder = (reminderId: number) => {
  router.push({ path: "/update", query: { rid: reminderId } });
};

onBeforeMount(async () => {
  reminders.value = await getReminders();
});
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="va-table-responsive flex justify-center max-w-6xl">
      <table class="va-table va-table--hoverable">
        <thead>
          <tr>
            <th>Reminder</th>
            <th>Description</th>
            <th>Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reminder in reminders" :key="reminder.id">
            <td>{{ reminder.name }}</td>
            <td>{{ reminder.description }}</td>
            <td>{{ dayjs(reminder.time, "hh:mm:ss").format("hh:mm A") }}</td>
            <td>
              <va-button
                icon="clear"
                color="danger"
                class="mb-2"
                @click="removeReminder(reminder.id)"
              >
                Delete
              </va-button>
              <va-button
                icon="edit_note"
                color="warning"
                class="ml-1 mb-2"
                @click="editReminder(reminder.id)"
              >
                Edit
              </va-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.va-table-responsive {
  overflow: auto;
}
</style>
