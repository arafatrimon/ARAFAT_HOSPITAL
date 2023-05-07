import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigatioinComponent } from './investigatioin.component';

describe('InvestigatioinComponent', () => {
  let component: InvestigatioinComponent;
  let fixture: ComponentFixture<InvestigatioinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestigatioinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestigatioinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
