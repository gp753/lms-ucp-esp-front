import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorSeguimientoComponent } from './administrador-seguimiento.component';

describe('AdministradorSeguimientoComponent', () => {
  let component: AdministradorSeguimientoComponent;
  let fixture: ComponentFixture<AdministradorSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorSeguimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
