import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaracionbeneficiosComponent } from './declaracionbeneficios.component';

describe('DeclaracionbeneficiosComponent', () => {
  let component: DeclaracionbeneficiosComponent;
  let fixture: ComponentFixture<DeclaracionbeneficiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclaracionbeneficiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclaracionbeneficiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
