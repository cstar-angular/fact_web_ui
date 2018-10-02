import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMainsectionComponent } from './home-mainsection.component';

describe('HomeMainsectionComponent', () => {
  let component: HomeMainsectionComponent;
  let fixture: ComponentFixture<HomeMainsectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMainsectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMainsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
