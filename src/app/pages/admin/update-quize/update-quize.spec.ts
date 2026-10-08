import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuize } from './update-quize';

describe('UpdateQuize', () => {
  let component: UpdateQuize;
  let fixture: ComponentFixture<UpdateQuize>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateQuize],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateQuize);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
