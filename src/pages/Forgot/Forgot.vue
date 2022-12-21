<script setup lang="ts">
import {ref, computed} from 'vue'

import WhiteBox from '@/components/Containers/WhiteBox'
import CodeStep from './Steps/CodeStep.vue'
import EmailStep from './Steps/EmailStep.vue'
import NewPasswordStep from './Steps/NewPasswordStep.vue'
import SuccessStep from './Steps/SuccessStep.vue'

const step = ref(1)

// Computed
const getStepText = computed((): string => {
  if (step.value === 1) {
    return 'Enter the email with which the account was registered'
  }

  if (step.value === 2) {
    return 'A 4-digit confirmation code has been sent to your email address, enter it in the form below'
  }

  if (step.value === 3) {
    return 'Enter a new password'
  }

  return 'Successfully! Login to your account using the new password...'
})
</script>

<template>
  <div class="flex flex-col items-center">
    <img
      class="h-11 w-auto"
      src="Donate Plus-logos_transparent_short.png"
      alt="DonatePlus"
    />

    <h2 class="heading-2 mt-6">Forgot password?</h2>

    <p class="mt-2 text-center text-sm text-gray-600">
      {{ getStepText }}
    </p>

    <WhiteBox
      class="max-w-full min-w-[446px] flex flex-col items-stretch px-10 pt-9 pb-10 mt-8 box-border"
    >
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
