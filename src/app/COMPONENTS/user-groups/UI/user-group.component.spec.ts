import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UserGroupComponent } from './user-group.component'

describe('UserGroupComponent', () => {
  let component: UserGroupComponent
  let fixture: ComponentFixture<UserGroupComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGroupComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(UserGroupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
