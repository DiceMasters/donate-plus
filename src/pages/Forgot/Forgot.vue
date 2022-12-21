<script setup lang="ts">
import {ref, computed} from 'vue'
import {useI18n} from 'vue-i18n'

import WhiteBox from '@/components/Containers/WhiteBox'
import CodeStep from './Steps/CodeStep.vue'
import EmailStep from './Steps/EmailStep.vue'
import NewPasswordStep from './Steps/NewPasswordStep.vue'
import SuccessStep from './Steps/SuccessStep.vue'

const {t} = useI18n()

const step = ref(1)

// Computed
const getStepText = computed((): string => {
  if (step.value === 1) {
    return t('forgot.steps.email')
  }

  if (step.value === 2) {
    return t('forgot.steps.code')
  }

  if (step.value === 3) {
    return t('forgot.steps.new')
  }

  return t('forgot.steps.success')
})
</script>

<template>
  <div class="flex flex-col items-center">
    <img
      class="h-11 w-auto"
      src="Donate Plus-logos_transparent_short.png"
      alt="DonatePlus"
    />

    <h2 class="heading-2 mt-6">{{ $t('forgot.title') }}</h2>

    <p class="mt-2 text-center text-sm text-gray-600">
      {{ getStepText }}
    </p>

    <WhiteBox class="max-w-full min-w-[446px] flex flex-col items-stretch px-10 pt-9 pb-10 mt-8 box-border">
      <EmailStep
        v-if="step === 1"
        @next="step++"
      />

      <CodeStep
        v-if="step === 2"
        @next="step++"
        @back="step--"
      />

      <NewPasswordStep
        v-if="step === 3"
        @next="step++"
        @back="step--"
      />

      <SuccessStep v-if="step === 4" />
    </WhiteBox>
  </div>
</template>
