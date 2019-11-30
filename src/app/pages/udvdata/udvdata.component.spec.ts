import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UdvdataComponent } from './udvdata.component';

describe('UdvdataComponent', () => {
  let component: UdvdataComponent;
  let fixture: ComponentFixture<UdvdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdvdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdvdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
