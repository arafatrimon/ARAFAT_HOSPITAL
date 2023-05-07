import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBillCollectionComponent } from './patient-bill-collection.component';

describe('PatientBillCollectionComponent', () => {
  let component: PatientBillCollectionComponent;
  let fixture: ComponentFixture<PatientBillCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientBillCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientBillCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
