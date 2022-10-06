import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInlineComponent } from './customer-inline.component';

describe('CustomerInlineComponent', () => {
  let component: CustomerInlineComponent;
  let fixture: ComponentFixture<CustomerInlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerInlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
