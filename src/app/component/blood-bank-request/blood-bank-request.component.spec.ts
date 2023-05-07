import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankRequestComponent } from './blood-bank-request.component';

describe('BloodBankRequestComponent', () => {
  let component: BloodBankRequestComponent;
  let fixture: ComponentFixture<BloodBankRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodBankRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodBankRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
