import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { UsersService } from '../users/users.service'
import { of, take } from 'rxjs'

export const authGuard: CanActivateFn = async (route, state) => {

  const authService = inject(UsersService)
  const router = inject(Router)

  authService.getUser().pipe(take(1)).subscribe(
    data => {
      var requiredRoles = route.data['roles']
      if (!authService.isUserSignedIn()) {
        router.navigate(['/login'])
        return of(false)
      }
      if (requiredRoles) {
        var hasRequiredRole = requiredRoles.some((role: string) => data?.roles.includes(role))
        if (!hasRequiredRole) {
          router.navigate(['/tasks-list'])
          return of(false)
        }
      }
      return
    })
  authService.isLoggedInSubject.next(authService.isUserSignedIn() as string)
  return true
};
