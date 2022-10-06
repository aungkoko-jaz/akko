import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordEmailComponent } from './forgotpassword-email.component';

describe('ForgotpasswordEmailComponent', () => {
  let component: ForgotpasswordEmailComponent;
  let fixture: ComponentFixture<ForgotpasswordEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotpasswordEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
