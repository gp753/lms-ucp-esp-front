import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoFichaComponent } from './alumno-ficha.component';

describe('AlumnoFichaComponent', () => {
  let component: AlumnoFichaComponent;
  let fixture: ComponentFixture<AlumnoFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoFichaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
