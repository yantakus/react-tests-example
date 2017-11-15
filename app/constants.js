const language = navigator.language || navigator.browserLanguage
const slicedLanguage = language.slice(0, 2) // slice first two characters of languge to convert ex. `en-US` to just `en`
export const DEFAULT_LOCALE = slicedLanguage === 'da' ? 'da' : 'en'

export const API_URL = 'https://example.com/api/v1'

export const REQUESTED = '_REQUESTED'
export const SUCCEDED = '_SUCCEDED'
export const FAILED = '_FAILED'
export const ERROR = '_ERROR'
