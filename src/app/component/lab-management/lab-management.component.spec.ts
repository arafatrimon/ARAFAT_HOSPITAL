import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabManagementComponent } from './lab-management.component';

describe('LabManagementComponent', () => {
  let component: LabManagementComponent;
  let fixture: ComponentFixture<LabManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
