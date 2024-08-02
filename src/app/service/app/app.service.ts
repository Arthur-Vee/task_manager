import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  localStorage: Storage | undefined

  constructor(public translate: TranslateService, @Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage
    translate.addLangs(['en', 'es', 'ru', 'lv'])
    translate.use(this.localStorage?.getItem('language') || 'en')
  }
  userPreferedLanguage(language: string): void {
    localStorage.setItem('language', language)
    this.translate.use(language)
  }
}