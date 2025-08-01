import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoMateriasTabOchoComponent } from './alumno-materias-tab-ocho.component';

describe('AlumnoMateriasTabOchoComponent', () => {
  let component: AlumnoMateriasTabOchoComponent;
  let fixture: ComponentFixture<AlumnoMateriasTabOchoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoMateriasTabOchoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoMateriasTabOchoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
