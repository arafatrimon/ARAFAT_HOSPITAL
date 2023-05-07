import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceHireComponent } from './ambulance-hire.component';

describe('AmbulanceHireComponent', () => {
  let component: AmbulanceHireComponent;
  let fixture: ComponentFixture<AmbulanceHireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbulanceHireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmbulanceHireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
