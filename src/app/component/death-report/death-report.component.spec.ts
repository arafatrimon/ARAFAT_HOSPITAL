import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathReportComponent } from './death-report.component';

describe('DeathReportComponent', () => {
  let component: DeathReportComponent;
  let fixture: ComponentFixture<DeathReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeathReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeathReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
