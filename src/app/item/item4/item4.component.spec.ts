import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Item4Component } from './item4.component';

describe('Item4Component', () => {
  let component: Item4Component;
  let fixture: ComponentFixture<Item4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Item4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Item4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
