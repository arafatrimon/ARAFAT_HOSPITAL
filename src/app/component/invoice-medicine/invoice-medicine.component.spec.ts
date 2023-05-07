import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceMedicineComponent } from './invoice-medicine.component';

describe('InvoiceMedicineComponent', () => {
  let component: InvoiceMedicineComponent;
  let fixture: ComponentFixture<InvoiceMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceMedicineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
