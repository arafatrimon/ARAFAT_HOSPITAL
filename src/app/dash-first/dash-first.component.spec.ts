import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashFirstComponent } from './dash-first.component';

describe('DashFirstComponent', () => {
  let component: DashFirstComponent;
  let fixture: ComponentFixture<DashFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashFirstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
