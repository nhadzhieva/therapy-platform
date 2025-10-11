import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionNotes } from './session-notes';

describe('SessionNotes', () => {
  let component: SessionNotes;
  let fixture: ComponentFixture<SessionNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionNotes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
