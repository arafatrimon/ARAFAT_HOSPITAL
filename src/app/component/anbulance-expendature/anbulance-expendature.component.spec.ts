import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnbulanceExpendatureComponent } from './anbulance-expendature.component';

describe('AnbulanceExpendatureComponent', () => {
  let component: AnbulanceExpendatureComponent;
  let fixture: ComponentFixture<AnbulanceExpendatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnbulanceExpendatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnbulanceExpendatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
