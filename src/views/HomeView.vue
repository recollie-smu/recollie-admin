<script setup lang="ts">
import { ref, type Ref } from "vue";

const name = ref("");
const description = ref("");
const daySelection: Ref<number[]> = ref([]);
const durationSelection: Ref<number[]> = ref([]);
const location = ref(1);
const locations = [1, 2, 3, 4];
// const status = ref(1);
// const statuses = ["Enabled", "Disabled"];
const time = ref(new Date());
const date  = ref(new Date());
const duration = ref(new Date());
const image = ref("");
</script>

<template>
  <main>
    <va-card>
      <va-card-title> Add Reminder </va-card-title>
      <va-card-content>
        <va-input
          v-model="name"
          class="mb-6 w-full"
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
          :options="locations"
        />

        <div class="mb-6">
          {{ daySelection }}
        </div>
        <div class="flex gap-2 flex-wrap">
          <va-checkbox
            v-model="daySelection"
            :array-value="1"
            label="Monday"
            class="mb-6"
          />
          <va-checkbox
            v-model="daySelection"
            :array-value="2"
            label="Tuesday"
            class="mb-6"
          />
          <va-checkbox
            v-model="daySelection"
            :array-value="3"
            label="Wednesday"
            class="mb-6"
          />
          <va-checkbox
            v-model="daySelection"
            :array-value="4"
            label="Thursday"
            class="mb-6"
          />
          <va-checkbox
            v-model="daySelection"
            :array-value="5"
            label="Friday"
            class="mb-6"
          />
          <va-checkbox
            v-model="daySelection"
            :array-value="6"
            label="Saturday"
            class="mb-6"
          />
          <va-checkbox
            v-model="daySelection"
            :array-value="0"
            label="Sunday"
            class="mb-6"
          />
        </div>

        <VaTimePicker
          v-model="duration"
          view="seconds"
        />

        <va-time-input 
          class="w-half mb-6"
          v-model="time" 
          ampm
        />

        <va-date-input 
          class="w-half mb-6"
          v-model="date" 
          ampm
        />

        <!-- <va-file-upload
          v-model="image"
          dropzone
        /> -->
        

      </va-card-content>
    </va-card>
  </main>
</template>
