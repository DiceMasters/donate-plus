<script setup lang="ts">
import {reactive, ref, computed} from 'vue'
import {RouterLink} from 'vue-router'
import {useVuelidate} from '@vuelidate/core'
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs
} from '@vuelidate/validators'

import * as Input from '@/components/UI/Input'
import WhiteBox from '@/components/Containers/WhiteBox'
import Button from '@/components/UI/Button'

const form = reactive({
  email: '',
  username: '',
  password: '',
  repeatPassword: '',
  agree: false
})
const hidePassword = ref(true)
const loading = ref(false)

const rules = {
  email: {required, email},
  username: {required, minLength: minLength(3), maxLength: maxLength(24)},
  password: {required, minLength: minLength(8)},
  repeatPassword: {
    required,
    minLength: minLength(8),
    sameAs: sameAs(form.password)
  },
  agree: {required}
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

// Validate:: Errors
const getEmailErrorText = computed(() => {
  return v$.value.email.$error
    ? 'Email is invalid, example example@mail.ru'
    : ''
})

const getUsernameErrorText = computed(() => {
  return v$.value.username.$error
    ? 'Username must be at least 3 and no more than 24 characters'
    : ''
})

const getPasswordErrorText = computed(() => {
  return v$.value.password.$error ? 'Password is required' : ''
})

const getPasswordRepeatErrorText = computed(() => {
  return v$.value.repeatPassword.$error ? 'Password is must be a same' : ''
})

const getAgreeErrorText = computed(() => {
  return v$.value.agree.$error ? 'Accept the terms of service' : ''
})

// Methods
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

    <h2 class="heading-2 mt-6">Sign Up</h2>

    <p class="mt-2 text-center text-sm text-gray-600">
      Start using the service with a 14-day free trial
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
        v-model="form.username"
        class="mb-2"
        label="Login"
        name="login"
        required
        :error="getUsernameErrorText"
      >
        <template #prepend>
          <fa-icon icon="fa-regular fa-user" />
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

      <Input.Text
        v-model="form.repeatPassword"
        class="mb-4"
        label="Repeat Password"
        name="repeat-password"
        required
        :type="getPasswordInputType"
        :error="getPasswordRepeatErrorText"
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

      <Input.Checkbox
        v-model="form.agree"
        class="mb-4"
        :error="getAgreeErrorText"
      >
        I agree to the
        <RouterLink
          to="/terms"
          tag="a"
          class="text-indigo-600 hover:text-indigo-500"
        >
          terms of service
        </RouterLink>
      </Input.Checkbox>

      <Button
        class="w-full"
        :disabled="v$.$error"
        :loading="loading"
        loading-spiner
        @click="onSubmit"
      >
        Submit
      </Button>
    </WhiteBox>
  </div>
</template>
