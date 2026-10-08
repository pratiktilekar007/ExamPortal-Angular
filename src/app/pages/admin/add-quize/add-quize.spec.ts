import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuize } from './add-quize';

describe('AddQuize', () => {
  let component: AddQuize;
  let fixture: ComponentFixture<AddQuize>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQuize],
    }).compileComponents();

    fixture = TestBed.createComponent(AddQuize);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
