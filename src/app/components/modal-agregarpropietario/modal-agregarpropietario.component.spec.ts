import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarpropietarioComponent } from './modal-agregarpropietario.component';

describe('ModalAgregarpropietarioComponent', () => {
  let component: ModalAgregarpropietarioComponent;
  let fixture: ComponentFixture<ModalAgregarpropietarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgregarpropietarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarpropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
