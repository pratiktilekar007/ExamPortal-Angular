import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestions } from './add-questions';

describe('AddQuestions', () => {
  let component: AddQuestions;
  let fixture: ComponentFixture<AddQuestions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQuestions],
    }).compileComponents();

    fixture = TestBed.createComponent(AddQuestions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
