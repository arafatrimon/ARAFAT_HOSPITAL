import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankSupplyComponent } from './blood-bank-supply.component';

describe('BloodBankSupplyComponent', () => {
  let component: BloodBankSupplyComponent;
  let fixture: ComponentFixture<BloodBankSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodBankSupplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodBankSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
