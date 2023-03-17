<script setup lang="ts">
import { ref, type Ref } from "vue";

const name = ref("");
const description = ref("");
const daySelection: Ref<number[]> = ref([]);
const location = ref(1);
const locations = [1, 2, 3, 4];
const time = ref(new Date());
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
          label="With label"
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

        <va-time-input class="w-full mb-6" v-model="time" ampm />
      </va-card-content>
    </va-card>
  </main>
</template>
