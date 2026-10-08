import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestions } from './view-questions';

describe('ViewQuestions', () => {
  let component: ViewQuestions;
  let fixture: ComponentFixture<ViewQuestions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewQuestions],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewQuestions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
