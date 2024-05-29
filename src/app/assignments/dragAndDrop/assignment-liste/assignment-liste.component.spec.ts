import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentListeComponent } from './assignment-liste.component';

describe('AssignmentListeComponent', () => {
  let component: AssignmentListeComponent;
  let fixture: ComponentFixture<AssignmentListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignmentListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
