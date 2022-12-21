<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,

  tabindex: {
    type: String,
    default: '0'
  },

  comment: String,
  error: String
})
const emit = defineEmits(['update:modelValue'])

const onChange = (value: Event) => {
  emit('update:modelValue', (value.target as HTMLInputElement).value)
}
</script>

<template>
  <div>
    <label class="flex items-center cursor-pointer">
      <input
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        :value="props.modelValue"
        :change="onChange"
        :tabindex="props.tabindex"
      />

      <span class="ml-2 block text-sm text-gray-900">
        <slot />
      </span>
    </label>

    <span
      v-if="props.comment"
      class="flex text-xs text-gray-400 mt-2"
    >
      {{ props.comment }}
    </span>

    <span
      v-if="props.error"
      class="flex text-xs text-red-600 mt-1"
    >
      {{ props.error }}
    </span>
  </div>
</template>
