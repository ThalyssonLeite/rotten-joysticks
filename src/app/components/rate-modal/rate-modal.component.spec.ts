import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateModalComponent } from './rate-modal.component';

describe('RateModalComponent', () => {
  let component: RateModalComponent;
  let fixture: ComponentFixture<RateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
