<script setup lang="ts">
import {ref, computed, reactive} from 'vue'
import {useVuelidate} from '@vuelidate/core'
import {required, email, minLength} from '@vuelidate/validators'

import * as Input from '@/components/UI/Input'
import Button from '@/components/UI/Button'

const emit = defineEmits(['next', 'back'])

const loading = ref(false)

const form = reactive({
  password: ''
})
const rules = {
  password: {required, minLength: minLength(8)}
}

const v$ = useVuelidate(rules, form)

// Computed
const getPasswordErrorText = computed(() => {
  return v$.value.password.$error
    ? 'New password musst be a more than 8-digits'
    : ''
})

// Methods
const onClick = async (): Promise<void> => {
  const validate = await v$.value.$validate()

  if (!validate) return

  // Fake API Call
  loading.value = true

  setTimeout(() => {
    loading.value = false
    emit('next')
  }, 2000)
}

const onBack = (): void => {
  emit('back')
}
</script>

<template>
  <div>
    <Input.Text
      v-model="form.password"
      class="mb-2"
      label="New Password"
      name="password"
      type="password"
      required
      :error="getPasswordErrorText"
    >
      <template #prepend>
        <fa-icon icon="fa-solid fa-lock" />
      </template>
    </Input.Text>

    <div class="flex gap-2">
      <Button
        class="w-full basis-2/4 grow shrink"
        :disabled="v$.$error"
        :loading="loading"
        @click="onClick"
      >
        Next
      </Button>

      <Button
        class="w-full basis-2/4 grow shrink"
        color="light"
        :loading="loading"
        :disabled="loading"
        @click="onBack"
      >
        Go Back
      </Button>
    </div>
  </div>
</template>
