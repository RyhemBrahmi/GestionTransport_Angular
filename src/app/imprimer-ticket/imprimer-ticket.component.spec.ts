import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimerTicketComponent } from './imprimer-ticket.component';

describe('ImprimerTicketComponent', () => {
  let component: ImprimerTicketComponent;
  let fixture: ComponentFixture<ImprimerTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimerTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimerTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
