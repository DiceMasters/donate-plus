<script setup lang="ts">
import {reactive, ref, computed} from 'vue'
import {RouterLink} from 'vue-router'
import {useVuelidate} from '@vuelidate/core'
import {required, email, minLength} from '@vuelidate/validators'

import * as Input from '@/components/UI/Input'
import WhiteBox from '@/components/Containers/WhiteBox'
import Button from '@/components/UI/Button'

const form = reactive({
  email: '',
  password: '',
  remember: false
})
const hidePassword = ref(true)
const loading = ref(false)

const rules = {
  email: {required, email},
  password: {required, minLength: minLength(8)}
}

const v$ = useVuelidate(rules, form)

const toggleHidePassword = () => {
  hidePassword.value = !hidePassword.value
}

const getEyeIcon = computed(() => {
  return hidePassword.value ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'
})

const getPasswordInputType = computed(() => {
  return hidePassword.value ? 'password' : 'text'
})

const getEmailErrorText = computed(() => {
  return v$.value.email.$error
    ? 'Email is invalid, example example@mail.ru'
    : ''
})

const getPasswordErrorText = computed(() => {
  return v$.value.password.$error ? 'Password is required' : ''
})

const onSubmit = async () => {
  const validate = await v$.value.$validate()

  if (!validate) {
    return
  }

  loading.value = true

  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div class="flex flex-col items-center">
    <img
      class="h-11 w-auto"
      src="Donate Plus-logos_transparent_short.png"
      alt="DonatePlus"
    />

    <h2 class="heading-2 mt-6">Sign in to your account</h2>

    <p class="mt-2 text-center text-sm text-gray-600">
      Or

      <RouterLink
        to="/signup"
        tag="a"
        class="font-medium text-indigo-600 hover:text-indigo-500"
      >
        start your 14-day free trial
      </RouterLink>
    </p>

    <WhiteBox
      class="max-w-full min-w-[446px] flex flex-col items-stretch px-10 pt-9 pb-10 mt-8 box-border"
    >
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

      <Input.Text
        v-model="form.password"
        class="mb-4"
        label="Password"
        name="password"
        required
        :type="getPasswordInputType"
        :error="getPasswordErrorText"
      >
        <template #prepend>
          <fa-icon icon="fa-solid fa-lock" />
        </template>

        <template #append>
          <fa-icon
            class="cursor-pointer"
            :icon="getEyeIcon"
            @click="toggleHidePassword"
          />
        </template>
      </Input.Text>

      <div class="flex items-center justify-between mb-4">
        <Input.Checkbox v-model="form.remember"> Remember me! </Input.Checkbox>

        <div class="text-sm">
          <RouterLink
            to="/forgot"
            tag="a"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </RouterLink>
        </div>
      </div>

      <Button
        class="w-full"
        :disabled="v$.$error"
        :loading="loading"
        @click="onSubmit"
      >
        Submit
      </Button>
    </WhiteBox>
  </div>
</template>
