import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisSelectorComponent } from './vis-selector.component';

describe('VisSelectorComponent', () => {
  let component: VisSelectorComponent;
  let fixture: ComponentFixture<VisSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
