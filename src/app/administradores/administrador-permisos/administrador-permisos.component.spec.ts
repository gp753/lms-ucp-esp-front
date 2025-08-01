import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorPermisosComponent } from './administrador-permisos.component';

describe('AdministradorPermisosComponent', () => {
  let component: AdministradorPermisosComponent;
  let fixture: ComponentFixture<AdministradorPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorPermisosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
