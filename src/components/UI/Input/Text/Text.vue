<script lang="ts" setup>
import Spiner from '@/components/UI/Spiner'

const props = defineProps({
  modelValue: String,

  name: {
    type: String,
    default: '',
    required: true
  },

  type: {
    type: String,
    default: 'text',
    validator: (value: string) => {
      return ['text', 'password'].includes(value)
    }
  },

  required: Boolean,
  disabled: Boolean,
  loading: Boolean,
  center: Boolean,

  label: String,
  placeholder: String,
  comment: String,
  error: String,
  ref: String,

  tabindex: {
    type: String,
    default: '0'
  }
})

const emit = defineEmits(['update:modelValue'])

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div>
    <label
      v-if="props.label"
      class="block text-sm font-medium text-gray-700 mb-1"
      :for="props.name"
    >
      {{ props.label }}
    </label>

    <div class="mt-1 flex rounded-md border border-gray-300 shadow-sm relative">
      <span
        v-if="$slots.prependSpan"
        class="flex items-center basis-auto shrink-0 grow-0 border-r border-gray-300 bg-gray-50 px-3 text-sm text-gray-500"
      >
        <slot name="prependSpan" />
      </span>

      <div
        v-if="$slots.prepend"
        class="inline-flex items-center basis-auto shrink-0 grow-0 px-3"
      >
        <div class="text-gray-500 sm:text-sm">
          <slot name="prepend" />
        </div>
      </div>

      <input
        class="block w-full flex-1 border-none py-2 px-3 appearance-none sm:text-sm focus-input-prevent"
        :class="{
          'text-center': props.center
        }"
        :name="props.name"
        :id="props.name"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        :type="type"
        :tabindex="props.tabindex"
        :required="required"
        :disabled="disabled || loading"
        @input="onInput"
      />

      <div
        v-if="$slots.append"
        class="flex items-center basis-auto shrink-0 grow-0 px-3"
      >
        <div class="text-gray-500 sm:text-sm">
          <slot name="append" />
        </div>
      </div>

      <span
        v-if="$slots.apendSpan"
        class="flex items-center basis-auto shrink-0 grow-0 border-l border-gray-300 bg-gray-50 px-3 text-sm text-gray-500"
      >
        <slot name="appendSpan" />
      </span>

      <div
        v-if="required"
        class="absolute right-[-4px] top-[-14px]"
      >
        <fa-icon
          class="text-xs text-red-600"
          icon="fa-solid fa-star-of-life"
        />
      </div>

      <div
        v-if="props.loading || props.disabled"
        class="w-full h-full bg-white bg-opacity-50 flex items-center justify-center absolute top-0 left-0 cursor-not-allowed"
      >
        <Spiner
          v-if="props.loading"
          class="text-gray-500"
          size="small"
        />
      </div>
    </div>

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
