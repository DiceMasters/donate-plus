<script setup lang="ts">
import {ref, computed, reactive} from 'vue'
import {useVuelidate} from '@vuelidate/core'
import {required, maxLength, minLength, numeric} from '@vuelidate/validators'
import {useI18n} from 'vue-i18n'

import * as Input from '@/components/UI/Input'
import Button from '@/components/UI/Button'

const {t} = useI18n()

const emit = defineEmits(['next', 'back'])

const loading = ref(false)
const form = reactive({
  _0: '',
  _1: '',
  _2: '',
  _3: ''
})
const rules = {
  _0: {required, maxLength: maxLength(1), minLength: minLength(1), numeric},
  _1: {required, maxLength: maxLength(1), minLength: minLength(1), numeric},
  _2: {required, maxLength: maxLength(1), minLength: minLength(1), numeric},
  _3: {required, maxLength: maxLength(1), minLength: minLength(1), numeric}
}

const v$ = useVuelidate(rules, form)

// Computed
const getCodeTextError = computed(() => {
  return v$.value.$errors.length ? t('codestep.error') : ''
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

const onInput = (charAt: number): void => {
  document.getElementById(`code${charAt}`)?.focus()
}
</script>

<template>
  <div>
    <div class="flex justify-center mb-2 gap-2">
      <Input.Text
        v-model="form._0"
        class="basis-10"
        name="code1"
        center
        :disabled="!!form._0"
        @input="onInput(2)"
      />

      <Input.Text
        v-model="form._1"
        class="basis-10"
        name="code2"
        center
        :disabled="!!form._1"
        @input="onInput(3)"
      />

      <Input.Text
        v-model="form._2"
        class="basis-10"
        name="code3"
        center
        :disabled="!!form._2"
        @input="onInput(4)"
      />

      <Input.Text
        v-model="form._3"
        class="basis-10"
        name="code4"
        center
        :disabled="!!form._3"
      />
    </div>

    <div
      v-if="getCodeTextError"
      class="text-red-600 text-sm mb-2"
    >
      {{ getCodeTextError }}
    </div>

    <div class="flex gap-2">
      <Button
        class="w-full basis-2/4 grow shrink"
        :disabled="v$.$error"
        :loading="loading"
        @click="onClick"
      >
        {{ $t('codestep.next') }}
      </Button>

      <Button
        class="w-full basis-2/4 grow shrink"
        color="light"
        :loading="loading"
        :disabled="loading"
        @click="onBack"
      >
        {{ $t('codestep.back') }}
      </Button>
    </div>
  </div>
</template>
