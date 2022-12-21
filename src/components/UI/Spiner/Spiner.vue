<script lang="ts" setup>
import {computed} from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'base',
    validator: (value: string) => {
      return ['small', 'base', 'large'].includes(value)
    }
  }
})

const getSizeClass = computed(() => {
  const associations = [
    {name: 'small', class: 'w-4 h-4'},
    {name: 'base', class: 'w-8 h-8'},
    {name: 'large', class: 'w-12 h-12'}
  ]

  return (
    associations.find(value => value.name === props.size)?.class ?? 'w-8 h-8'
  )
})
</script>

<template>
  <div
    class="spinner-border animate-spin inline-block border-4 rounded-full"
    :class="[getSizeClass]"
    role="status"
  >
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<style src="./spiner.scss" lang="scss"></style>
