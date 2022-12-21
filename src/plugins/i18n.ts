import {createI18n} from 'vue-i18n'

import messages from '@/i18n/index'

export const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages,
  allowComposition: true
})
