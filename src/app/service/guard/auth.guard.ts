import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { UsersService } from '../users/users.service'

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(UsersService)
  const router = inject(Router)

  if (!authService.isUserSignedIn()) {
    authService.isLoogedInSubject.next(authService.isUserSignedIn() as string)
    router.navigate(['/login'])
    return false
  }
  authService.isLoogedInSubject.next(authService.isUserSignedIn() as string)
  return true
};
