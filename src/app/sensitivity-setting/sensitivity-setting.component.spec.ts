import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensitivitySettingComponent } from './sensitivity-setting.component';

describe('SensitivitySettingComponent', () => {
  let component: SensitivitySettingComponent;
  let fixture: ComponentFixture<SensitivitySettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensitivitySettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensitivitySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
