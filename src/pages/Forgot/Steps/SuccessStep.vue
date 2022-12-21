<script setup lang="ts">
import Button from '@/components/UI/Button'
import {useRouter} from 'vue-router'

const router = useRouter()

// Methods
const onClick = (): void => {
  router.push('/')
}
</script>

<template>
  <div class="flex gap-2">
    <Button
      class="w-full basis-2/4 grow shrink"
      @click="onClick"
    >
      {{ $t('successstep.signin') }}
    </Button>
  </div>
</template>
