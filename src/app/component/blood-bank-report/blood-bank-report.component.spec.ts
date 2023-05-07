import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankReportComponent } from './blood-bank-report.component';

describe('BloodBankReportComponent', () => {
  let component: BloodBankReportComponent;
  let fixture: ComponentFixture<BloodBankReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodBankReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodBankReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
