import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelAppointmentDialog } from './cancel-appointment-dialog';

describe('CancelAppointmentDialog', () => {
  let component: CancelAppointmentDialog;
  let fixture: ComponentFixture<CancelAppointmentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelAppointmentDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelAppointmentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
