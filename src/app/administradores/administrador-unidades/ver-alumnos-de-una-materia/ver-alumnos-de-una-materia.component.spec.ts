import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAlumnosDeUnaMateriaComponent } from './ver-alumnos-de-una-materia.component';

describe('VerAlumnosDeUnaMateriaComponent', () => {
  let component: VerAlumnosDeUnaMateriaComponent;
  let fixture: ComponentFixture<VerAlumnosDeUnaMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerAlumnosDeUnaMateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAlumnosDeUnaMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
