import {auth} from './lib/auth'
import {codestep} from './lib/codestep'
import {emailstep} from './lib/emailstep'
import {forgot} from './lib/forgot'
import {newpasswordstep} from './lib/newpasswordstep'
import {signup} from './lib/signup'
import {successstep} from './lib/successstep'
import {terms} from './lib/terms'

type TI18NLib = {
  key: string
  en: Record<string, any>
  ru: Record<string, any>
}

type TI18NDictionary = {
  en: Record<string, any>
  ru: Record<string, any>
}

function convertToLib(libs: TI18NLib[]): TI18NDictionary {
  return libs.reduce(
    (accumulator: TI18NDictionary, currentLib: TI18NLib, index: number) => {
      let ru: Record<string, any> = {},
        en: Record<string, any> = {}

      ru[currentLib.key] = currentLib.ru
      en[currentLib.key] = currentLib.en

      const lib: TI18NDictionary = {
        ru: {...ru, ...accumulator.ru},
        en: {...en, ...accumulator.en}
      }

      return lib
    },
    {
      ru: {},
      en: {}
    }
  )
}

export default convertToLib([auth, signup, terms, forgot, codestep, newpasswordstep, emailstep, successstep])
