import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CreateUserGroupComponent } from '../create/create-user-group.component'
import { UpdateComponent } from '../update/update-group.component'
import { MaterialModule } from '../../../material.module'
import { TranslateModule } from '@ngx-translate/core'
import { RouterOutlet, RouterLink } from '@angular/router'

@Component({
  selector: 'app-user-group',
  standalone: true,
  imports: [
    CreateUserGroupComponent,
    CommonModule,
    UpdateComponent,
    MaterialModule,
    TranslateModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './user-group.component.html',
  styleUrl: './user-group.component.scss',
})
export class UserGroupComponent {}
