import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorCrearUsuarioComponent } from './administrador-crear-usuario.component';

describe('AdministradorCrearUsuarioComponent', () => {
  let component: AdministradorCrearUsuarioComponent;
  let fixture: ComponentFixture<AdministradorCrearUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorCrearUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorCrearUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
