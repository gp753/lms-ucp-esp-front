import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerAlumnoComponent } from './modal-ver-alumno.component';

describe('ModalVerAlumnoComponent', () => {
  let component: ModalVerAlumnoComponent;
  let fixture: ComponentFixture<ModalVerAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVerAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
