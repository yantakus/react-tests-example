// @flow

/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl'
import { DEFAULT_LOCALE } from 'components/App/constants'

import enLocaleData from 'react-intl/locale-data/en'
import daLocaleData from 'react-intl/locale-data/da'

export const appLocales = [
  'en',
  'da'
]

import enTranslationMessages from './translations/en.json'
import daTranslationMessages from './translations/da.json'

addLocaleData(enLocaleData)
addLocaleData(daLocaleData)

export const formatTranslationMessages = (locale: string, messages: Object) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages) : {}
  const formattedMessages = {}
  const messageKeys = Object.keys(messages)
  for (const messageKey of messageKeys) {
    if (locale === DEFAULT_LOCALE) {
      formattedMessages[messageKey] = messages[messageKey]
    } else {
      formattedMessages[messageKey] = messages[messageKey] || defaultFormattedMessages[messageKey]
    }
  }

  return formattedMessages
}

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  da: formatTranslationMessages('da', daTranslationMessages)
}
