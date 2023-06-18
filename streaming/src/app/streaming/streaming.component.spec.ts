import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingComponent } from './streaming.component';

describe('StreamingComponent', () => {
  let component: StreamingComponent;
  let fixture: ComponentFixture<StreamingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StreamingComponent]
    });
    fixture = TestBed.createComponent(StreamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});