import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaracionEnviadaComponent } from './declaracion-enviada.component';

describe('DeclaracionEnviadaComponent', () => {
  let component: DeclaracionEnviadaComponent;
  let fixture: ComponentFixture<DeclaracionEnviadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclaracionEnviadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclaracionEnviadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
