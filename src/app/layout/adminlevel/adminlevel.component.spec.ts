import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlevelComponent } from './adminlevel.component';

describe('AdminlevelComponent', () => {
  let component: AdminlevelComponent;
  let fixture: ComponentFixture<AdminlevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminlevelComponent ]
    })
    .compileComponents();
  }));

  
  beforeEach(() => {
    fixture = TestBed.createComponent(AdminlevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
