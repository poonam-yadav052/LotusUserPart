import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentadvicenoteComponent } from './paymentadvicenote.component';

describe('PaymentadvicenoteComponent', () => {
  let component: PaymentadvicenoteComponent;
  let fixture: ComponentFixture<PaymentadvicenoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentadvicenoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentadvicenoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
