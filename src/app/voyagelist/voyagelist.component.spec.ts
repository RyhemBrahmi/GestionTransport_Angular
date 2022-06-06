import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyagelistComponent } from './voyagelist.component';

describe('VoyagelistComponent', () => {
  let component: VoyagelistComponent;
  let fixture: ComponentFixture<VoyagelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoyagelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoyagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
