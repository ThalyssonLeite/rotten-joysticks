import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBallsComponent } from './loading-balls.component';

describe('LoadingBallsComponent', () => {
  let component: LoadingBallsComponent;
  let fixture: ComponentFixture<LoadingBallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingBallsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingBallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
