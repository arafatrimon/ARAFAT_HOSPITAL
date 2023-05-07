import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceBookUnbookComponent } from './ambulance-book-unbook.component';

describe('AmbulanceBookUnbookComponent', () => {
  let component: AmbulanceBookUnbookComponent;
  let fixture: ComponentFixture<AmbulanceBookUnbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbulanceBookUnbookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmbulanceBookUnbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
