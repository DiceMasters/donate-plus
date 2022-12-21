<script setup lang="ts">
import {useRouter, useRoute} from 'vue-router'
import {computed} from 'vue'
import Button from '@/components/UI/Button'

const router = useRouter()
const route = useRoute()

const getIsHome = computed(() => {
  return route.name === 'auth'
})

const onClickBack = () => {
  router.go(-1)
}
</script>

<template>
  <div
    class="w-screen h-screen flex items-center justify-center bg-gray-50 relative"
  >
    <slot />

    <Button
      v-if="!getIsHome"
      class="!absolute top-2 left-2"
      icon
      @click="onClickBack"
    >
      <fa-icon icon="fa-solid fa-chevron-left" />
    </Button>
  </div>
</template>
