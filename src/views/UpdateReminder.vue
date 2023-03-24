<script setup lang="ts">
import { getReminder, updateReminder } from "@/apis/supabase";
import { onBeforeMount, ref, type Ref } from "vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { ReminderData } from "@/types/reminder";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ROOMS = ["Bedroom", "Kitchen", "Study Room", "Bathroom"];

dayjs.extend(customParseFormat);
const name = ref("");
const status = ref(false);
const description = ref("");
const daySelection: Ref<number[]> = ref([]);
const location = ref("");
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
      location.value = ROOMS[ret.location - 1];
      time.value = dayjs(ret.time, "HH:mm:ss").toDate();
      date.value = dayjs(ret.date, "YYYY-MM-DD").toDate();
      if (ret.monday) {
        daySelection.value.push(0);
      }
      if (ret.tuesday) {
        daySelection.value.push(1);
      }
      if (ret.wednesday) {
        daySelection.value.push(2);
      }
      if (ret.thursday) {
        daySelection.value.push(3);
      }
      if (ret.friday) {
        daySelection.value.push(4);
      }
      if (ret.saturday) {
        daySelection.value.push(5);
      }
      if (ret.sunday) {
        daySelection.value.push(6);
      }
      durationHours.value = Math.floor((ret.duration / (1000 * 60 * 60)) % 24);
      durationMinutes.value = Math.floor((ret.duration / (1000 * 60)) % 60);
      durationSeconds.value = Math.floor((ret.duration / 1000) % 60);
      status.value = Boolean(ret.status);
    }
  }
});

const submitReminder = async () => {
  const tmpDuration =
    (durationHours.value * 60 * 60 +
      durationMinutes.value * 60 +
      durationSeconds.value) *
    1000;
  const locationIdx = ROOMS.findIndex((loc) => loc === location.value);
  const reminder: ReminderData = {
    name: name.value,
    status: Number(status.value),
    description: description.value,
    location: locationIdx + 1,
    duration: tmpDuration,
    time: dayjs(time.value).format("HH:mm:ss"),
    date: dayjs(date.value).format("YYYY-MM-DD"),
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    image: null,
    memo: null,
    date_created: new Date(),
    date_updated: null,
  };

  for (const day of daySelection.value) {
    switch (day) {
      case 0:
        reminder.monday = true;
        break;
      case 1:
        reminder.tuesday = true;
        break;
      case 2:
        reminder.wednesday = true;
        break;
      case 3:
        reminder.thursday = true;
        break;
      case 4:
        reminder.friday = true;
        break;
      case 5:
        reminder.saturday = true;
        break;
      case 6:
        reminder.sunday = true;
        break;
      default:
        break;
    }
  }
  await updateReminder(reminder, Number(route.query.rid));
};
</script>

<template>
  <main class="p-4">
    <va-card class="p-4 mb-2">
      <va-card-title> Details </va-card-title>
      <va-card-content>
        <va-input
          v-model="name"
          class="mb-6 w-full"
          label="Reminder"
          placeholder="Reminder"
        />

        <va-switch
          v-model="status"
          label="Enable / Disable"
          left-label
          class="mb-6"
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
          :options="ROOMS"
        />
      </va-card-content>
    </va-card>

    <va-card class="p-4">
      <va-card-title> Timing </va-card-title>
      <va-card-content>
        <div class="mb-4">
          <div class="mr-3 mb-4">
            <p class="font-bold mb-2">Duration</p>
            <va-input
              label="Hours"
              v-model="durationHours"
              class="mr-1"
              type="number"
              min="0"
              max="23"
            />

            <va-input
              label="Minutes"
              v-model="durationMinutes"
              class="mr-1"
              type="number"
              min="0"
              max="59"
            />

            <va-input
              label="Seconds"
              v-model="durationSeconds"
              class="mr-1"
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
          <div class="py-2">
            Your reminder will occur on
            {{ dayjs(date).format("dddd, DD-MMM-YYYY") }}, at
            {{ dayjs(time).format("hh:mm A") }}
          </div>
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
        </div>
        <div class="flex">
          <va-button @click="submitReminder"> Submit </va-button>
        </div>
      </va-card-content>
    </va-card>
  </main>
</template>
