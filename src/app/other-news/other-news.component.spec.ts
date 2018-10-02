import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherNewsComponent } from './other-news.component';

describe('OtherNewsComponent', () => {
  let component: OtherNewsComponent;
  let fixture: ComponentFixture<OtherNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
