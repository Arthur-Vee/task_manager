import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core'
import { provideRouter, withComponentInputBinding } from '@angular/router'

import { routes } from './app.routes'
import { provideClientHydration } from '@angular/platform-browser'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http'

import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core'
import { HttpLoaderFactory } from './translate-loader'

import { provideStore } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { taskReducer } from './store/task/task.reducer'
import { TaskEffects } from './store/task/task.effects'

import { userReducer } from './store/user/user.reducer'
import { UserEffects } from './store/user/user.effects'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    TranslateService,
    provideStore({
      tasks: taskReducer,
      users: userReducer,
    }),
    provideEffects(TaskEffects, UserEffects),
  ],
}
