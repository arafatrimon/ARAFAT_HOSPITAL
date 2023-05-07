import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticBillCollectionComponent } from './diagnostic-bill-collection.component';

describe('DiagnosticBillCollectionComponent', () => {
  let component: DiagnosticBillCollectionComponent;
  let fixture: ComponentFixture<DiagnosticBillCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticBillCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticBillCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
