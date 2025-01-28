import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient } from '@angular/common/http'
import { i18nApiUrl } from './utils/constants'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, i18nApiUrl)
}