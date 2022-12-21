<script setup lang="ts">
import {ref, computed, reactive} from 'vue'
import {useVuelidate} from '@vuelidate/core'
import {required, email} from '@vuelidate/validators'

import * as Input from '@/components/UI/Input'
import Button from '@/components/UI/Button'

const emit = defineEmits(['next'])

const loading = ref(false)

const form = reactive({
  email: ''
})
const rules = {
  email: {required, email}
}

const v$ = useVuelidate(rules, form)

// Computed
const getEmailErrorText = computed(() => {
  return v$.value.email.$error
    ? 'Email is invalid, example example@mail.ru'
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
</script>

<template>
  <div>
    <Input.Text
      v-model="form.email"
      class="mb-2"
      label="Email"
      name="email"
      placeholder="example@mail.ru"
      required
      :error="getEmailErrorText"
    >
      <template #prepend>
        <fa-icon icon="fa-regular fa-envelope" />
      </template>
    </Input.Text>

    <Button
      class="w-full"
      :disabled="v$.$error"
      :loading="loading"
      @click="onClick"
    >
      Next
    </Button>
  </div>
</template>
