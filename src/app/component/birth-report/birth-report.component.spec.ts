import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthReportComponent } from './birth-report.component';

describe('BirthReportComponent', () => {
  let component: BirthReportComponent;
  let fixture: ComponentFixture<BirthReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
