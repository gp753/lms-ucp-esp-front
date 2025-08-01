import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorCargarInformacionGeneralComponent } from './administrador-cargar-informacion-general.component';

describe('AdministradorCargarInformacionGeneralComponent', () => {
  let component: AdministradorCargarInformacionGeneralComponent;
  let fixture: ComponentFixture<AdministradorCargarInformacionGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorCargarInformacionGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorCargarInformacionGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
