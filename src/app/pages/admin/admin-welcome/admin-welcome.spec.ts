import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWelcome } from './admin-welcome';

describe('AdminWelcome', () => {
  let component: AdminWelcome;
  let fixture: ComponentFixture<AdminWelcome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminWelcome],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminWelcome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
