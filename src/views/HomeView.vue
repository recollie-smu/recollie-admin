<script setup lang="ts">
import { ref, type Ref } from "vue";

const name = ref("");
const description = ref("");
const daySelection: Ref<number[]> = ref([]);
const location = ref("");
const locations = ["Kitchen", "Master bedroom", "Bathroom", "Living Room"];
const time = ref(new Date());
const date = ref(new Date());
const duration = ref(new Date());
</script>

<template>
  <main class="p-4">
    <va-card class="p-4 mb-2">
      <va-card-title> Details </va-card-title>
      <va-card-content>
        <va-input
          v-model="name"
          class="mb-6 w-half"
          label="Name"
          placeholder="Name"
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
          label="Location of reminder"
          placeholder="Outside"
          :options="locations"
        />
      </va-card-content>
    </va-card>

    <va-card class="p-4">
      <va-card-title> Timing </va-card-title>
      <va-card-content>
        <div class="mb-4">
          <div class="">
            <h6>
              {{ duration.getHours() }}:{{ duration.getMinutes() }}:{{
                duration.getSeconds()
              }}
            </h6>
            <va-time-picker v-model="duration" view="seconds" />

            <va-time-input
              class="mr-3"
              v-model="time"
              label="time of reminder"
              ampm
            />

            <va-date-input
              class="mr-3"
              v-model="date"
              label="date of reminder"
              ampm
            />
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
          <div class="py-2">
            Selected:
            {{ daySelection }}
          </div>
        </div>
      </va-card-content>
    </va-card>
  </main>
</template>
