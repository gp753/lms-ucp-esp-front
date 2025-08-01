import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDeAsistenciasComponent } from './reporte-de-asistencias.component';

describe('ReporteDeAsistenciasComponent', () => {
  let component: ReporteDeAsistenciasComponent;
  let fixture: ComponentFixture<ReporteDeAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteDeAsistenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDeAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
