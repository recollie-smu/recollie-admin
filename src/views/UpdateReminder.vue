<script setup lang="ts">
import { getReminder } from "@/apis/supabase";
import { getSystemErrorMap } from "util";
import { onBeforeMount, ref, type Ref } from "vue";
import { useRoute } from "vue-router";

const name = ref("");
const description = ref("");
const daySelection: Ref<Number[]> = ref([]);
const location = ref(0);
const locations = ["Kitchen", "Master bedroom", "Bathroom", "Living Room"];
const time = ref(new Date());
const date = ref(new Date());
const durationHours = ref(0);
const durationMinutes = ref(0);
const durationSeconds = ref(0);
const route = useRoute();

onBeforeMount(async () => {
  if (route.query.rid) {
    const ret = await getReminder(Number(route.query.rid));
    if (ret) {
      name.value = ret.name;
      description.value = ret.description;
      daySelection.value = ret.daySelection;
      location.value = ret.location;
      time.value = ret.time;
      date.value = ret.date;
      durationHours.value = ret.durationHours;
      durationMinutes.value = ret.durationMinutes;
      durationSeconds.value = ret.durationSeconds;
    }
  }
});
</script>

<template>
  <main class="p-4">
    <va-card class="p-4 mb-2">
      <va-card-title> Details </va-card-title>
      <va-card-content>
        <va-input
          v-model="name"
          class="mb-6 w-half"
          label="Reminder"
          placeholder="Reminder"
        />

        <va-input
          v-model="description"
          class="mb-6 w-full"
          label="Description"
          placeholder="Description"
          type="textarea"
        />

        <va-select
          v-model="location"
          class="mb-6 w-full"
          label="Location"
          placeholder="Location"
          :options="['Kitchen', 'Master bedroom', 'Bathroom', 'Living Room']"
        />
      </va-card-content>
    </va-card>

    <va-card class="p-4">
      <va-card-title> Timing </va-card-title>
      <va-card-content>
        <div class="mb-4">
          <div class="inline">
            <span class="mr-3">HOURS</span>
            <span class="mr-3">MINUTES</span>
            <span class="mr-3">SECONDS</span>
          </div>
          <div class="mr-3 mb-4">
            <va-input
              v-model="durationHours"
              class="mr-1 w-20"
              type="number"
              min="0"
              max="24"
            />

            <va-input
              v-model="durationMinutes"
              class="mr-1 w-20"
              type="number"
              min="0"
              max="59"
            />

            <va-input
              v-model="durationSeconds"
              class="mr-1 w-20"
              type="number"
              min="0"
              max="60"
              step="5"
            />
          </div>

          <!-- this one will put the time in seconds unless they put in their timing?? like if they set the reminder to now then all repeated reminders will be like at 11:25:24 and the seconds part a bit weird -->
          <va-time-input
            class="mr-3"
            v-model="time"
            manual-input
            label="time"
            ampm
          />

          <va-date-input class="mr-3" v-model="date" label="date" ampm />
        </div>

        <div class="mb-4">
          <p class="py-2">Set reminder to repeat every:</p>

          <va-option-list
            v-model="daySelection"
            class="flex"
            :options="[
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ]"
          />
          
          <div class="py-2" v-if="daySelection">
            Your reminder will repeat every {{ daySelection }} at
            {{ time.toLocaleTimeString() }}
          </div>
        </div>
      </va-card-content>
    </va-card>
  </main>
</template>