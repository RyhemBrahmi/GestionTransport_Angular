import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketListDialogComponent } from './ticket-list-dialog.component';

describe('TicketListDialogComponent', () => {
  let component: TicketListDialogComponent;
  let fixture: ComponentFixture<TicketListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
