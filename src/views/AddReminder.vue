<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { Reminder, ReminderData } from "@/types/reminder";
import { addImage, addReminder, getBucket } from "@/apis/supabase";

dayjs.extend(customParseFormat);
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ROOMS = ["Bathroom", "Bedroom", "Kitchen", "Living Room"];

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
const displayImage = ref();

const submitReminder = async () => {
  let imageUrl = "";
  if (displayImage.value) {
    const tmpImg = displayImage.value as File;
    imageUrl = await addImage(tmpImg, name.value);
  }

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
    image: imageUrl,
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
  await addReminder(reminder);
};
</script>

<template>
  <main class="p-4">
    <div class="box">
      <va-card class="p-4 mb-2">
        <va-card-title> Details </va-card-title>
        <va-card-content>
          <va-input
            v-model="name"
            class="mb-6 w-full"
            label="Reminder Name"
            placeholder="Wash the dishes..."
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
            placeholder="The soap will be in the top cupboard..."
            type="textarea"
          />

          <va-select
            v-model="location"
            class="mb-6 w-full"
            label="Location"
            placeholder="Location"
            :options="ROOMS"
          />

          <p class="font-bold mb-2">Image</p>
          <va-file-upload v-model="displayImage" dropzone type="single" />
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

            <va-option-list
              v-model="daySelection"
              class="flex"
              :options="DAYS"
            />
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
    </div>
  </main>
</template>
