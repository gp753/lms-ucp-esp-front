import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerExamenesDelAlumnoComponent } from './ver-examenes-del-alumno.component';

describe('VerExamenesDelAlumnoComponent', () => {
  let component: VerExamenesDelAlumnoComponent;
  let fixture: ComponentFixture<VerExamenesDelAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerExamenesDelAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerExamenesDelAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
