import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorUnidadesComponent } from './administrador-unidades.component';

describe('AdministradorUnidadesComponent', () => {
  let component: AdministradorUnidadesComponent;
  let fixture: ComponentFixture<AdministradorUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorUnidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
