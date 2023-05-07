import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanResourceCategoryComponent } from './human-resource-category.component';

describe('HumanResourceCategoryComponent', () => {
  let component: HumanResourceCategoryComponent;
  let fixture: ComponentFixture<HumanResourceCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumanResourceCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumanResourceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
