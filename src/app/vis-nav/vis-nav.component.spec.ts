import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisNavComponent } from './vis-nav.component';

describe('VisNavComponent', () => {
  let component: VisNavComponent;
  let fixture: ComponentFixture<VisNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
