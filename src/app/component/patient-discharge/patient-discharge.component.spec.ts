import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDischargeComponent } from './patient-discharge.component';

describe('PatientDischargeComponent', () => {
  let component: PatientDischargeComponent;
  let fixture: ComponentFixture<PatientDischargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDischargeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDischargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
