import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { UsersService } from '../users/users.service'

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(UsersService)
  const router = inject(Router)

  console.log("Performing User Login before leting him in")
  if (authService.isUserSignedIn()) {
    router.navigate(['/tasks-list'])
  }
  return true
}
