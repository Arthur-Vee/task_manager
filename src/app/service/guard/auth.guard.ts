import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { UsersService } from '../users/users.service'
import { of, take } from 'rxjs'

export const authGuard: CanActivateFn = async (route, state) => {

  const authService = inject(UsersService)
  const router = inject(Router)

  authService.getUser().pipe(take(1)).subscribe(
    currentUser => {
      let requiredRoles = route.data['requiredRoles']
      if (!authService.isUserSignedIn()) {
        router.navigate(['/login'])
        return of(false)
      }
      if (requiredRoles) {
        let userHaveRequiredRole = requiredRoles.some((requiredRole: string) => currentUser?.roles.includes(requiredRole))
        if (!userHaveRequiredRole) {
          router.navigate(['/tasks-list'])
          return of(false)
        }
      }
      return
    })
  authService.isLoggedInSubject.next(authService.isUserSignedIn() as string)
  return true
}
