import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorCargarExamenComponent } from './administrador-cargar-examen.component';

describe('AdministradorCargarExamenComponent', () => {
  let component: AdministradorCargarExamenComponent;
  let fixture: ComponentFixture<AdministradorCargarExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorCargarExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorCargarExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
