import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TASKComponent } from './task.component';

describe('TASKComponent', () => {
  let component: TASKComponent;
  let fixture: ComponentFixture<TASKComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TASKComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TASKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
