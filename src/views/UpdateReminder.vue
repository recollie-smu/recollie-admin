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
const repeatSwitch = ref(false);
const description = ref("");
const daySelection: Ref<string[]> = ref([]);
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
        daySelection.value.push("Monday");
      }
      if (ret.tuesday) {
        daySelection.value.push("Tuesday");
      }
      if (ret.wednesday) {
        daySelection.value.push("Wednesday");
      }
      if (ret.thursday) {
        daySelection.value.push("Thursday");
      }
      if (ret.friday) {
        daySelection.value.push("Friday");
      }
      if (ret.saturday) {
        daySelection.value.push("Saturday");
      }
      if (ret.sunday) {
        daySelection.value.push("Sunday");
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
  let tmpDate = "";
  if (!repeatSwitch.value) {
    tmpDate = dayjs(date.value).format("YYYY-MM-DD");
  }
  const locationIdx = ROOMS.findIndex((loc) => loc === location.value);
  const reminder: ReminderData = {
    name: name.value,
    status: Number(status.value),
    description: description.value,
    location: locationIdx + 1,
    duration: tmpDuration,
    time: dayjs(time.value).format("HH:mm:ss"),
    date: tmpDate,
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

  if (repeatSwitch.value) {
    for (const day of daySelection.value) {
      switch (day) {
        case "Monday":
          reminder.monday = true;
          break;
        case "Tuesday":
          reminder.tuesday = true;
          break;
        case "Wednesday":
          reminder.wednesday = true;
          break;
        case "Thursday":
          reminder.thursday = true;
          break;
        case "Friday":
          reminder.friday = true;
          break;
        case "Saturday":
          reminder.saturday = true;
          break;
        case "Sunday":
          reminder.sunday = true;
          break;
        default:
          break;
      }
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

        <div class="mb-4">
          <va-time-input
            class="mr-3"
            v-model="time"
            manual-input
            label="time"
            ampm
          />
        </div>

        <div>
          <va-switch
            v-model="repeatSwitch"
            label="Once / Repeat"
            left-label
            class="mb-6"
          />
        </div>

        <va-date-input
          class="mr-3"
          v-model="date"
          label="date"
          ampm
          v-if="!repeatSwitch"
        />

        <div class="mb-4" v-else>
          <p class="py-2">Set reminder to repeat every:</p>

          <va-option-list v-model="daySelection" class="flex" :options="DAYS" />
        </div>
        <div class="py-2" v-if="!repeatSwitch">
          Your reminder will occur on
          {{ dayjs(date).format("dddd, DD-MMM-YYYY") }}, at
          {{ dayjs(time).format("hh:mm A") }}
        </div>
        <div class="py-2" v-else-if="repeatSwitch && daySelection.length > 0">
          Your reminder will occur every
          <span v-for="day in daySelection" :key="day"> {{ day }}, </span> at
          {{ dayjs(time).format("hh:mm A") }}
        </div>
        <div class="flex">
          <va-button @click="submitReminder"> Submit </va-button>
        </div>
      </va-card-content>
    </va-card>
  </main>
</template>
