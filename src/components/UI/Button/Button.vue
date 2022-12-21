<script setup lang="ts">
import {computed} from 'vue'

import Spiner from '../Spiner'

const props = defineProps({
  icon: Boolean,

  disabled: Boolean,
  loading: Boolean,
  loadingSpiner: Boolean,
  tabindex: {
    type: String,
    default: '0'
  },

  color: {
    type: String,
    default: 'indigo',
    validator: (value: string) => {
      return ['indigo', 'light'].includes(value)
    }
  }
})

const getColors = computed(() => {
  if (props.color === 'indigo') {
    return 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-white'
  }

  if (props.color === 'light') {
    return 'bg-slate-200 hover:bg-slate-300 focus:ring-slate-100 text-gray-800'
  }

  return 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-white'
})
</script>

<template>
  <button
    class="h-9 flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 relative"
    :class="{
      'w-9 h-9 rounded-full items-center': icon,
      'cursor-not-allowed': props.loading || props.disabled,
      [getColors]: true
    }"
    :disabled="props.disabled"
    :tabindex="props.tabindex"
  >
    <slot v-if="!props.loading" />

    <div
      v-if="props.loading"
      class="w-full h-full bg-white bg-opacity-50 flex items-center justify-center absolute top-0 left-0"
    >
      <Spiner
        v-if="props.loadingSpiner"
        class="text-white"
        size="small"
      />

      <template v-else>Loading</template>
    </div>
  </button>
</template>
