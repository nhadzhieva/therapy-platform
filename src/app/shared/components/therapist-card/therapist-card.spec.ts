import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistCardComponent } from './therapist-card';

describe('TherapistCard', () => {
  let component: TherapistCardComponent;
  let fixture: ComponentFixture<TherapistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapistCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TherapistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
