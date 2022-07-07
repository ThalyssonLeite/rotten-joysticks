import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletionModalComponent } from './deletion-modal.component';

describe('DeletionModalComponent', () => {
  let component: DeletionModalComponent;
  let fixture: ComponentFixture<DeletionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
