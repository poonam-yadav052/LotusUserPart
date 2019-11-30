import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentreconsilationComponent } from './paymentreconsilation.component';

describe('PaymentreconsilationComponent', () => {
  let component: PaymentreconsilationComponent;
  let fixture: ComponentFixture<PaymentreconsilationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentreconsilationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentreconsilationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
