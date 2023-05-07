import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutdoorPatientComponent } from './outdoor-patient.component';

describe('OutdoorPatientComponent', () => {
  let component: OutdoorPatientComponent;
  let fixture: ComponentFixture<OutdoorPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutdoorPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutdoorPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
