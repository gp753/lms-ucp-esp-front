import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoTabsMateriasComponent } from './alumno-tabs-materias.component';

describe('AlumnoTabsMateriasComponent', () => {
  let component: AlumnoTabsMateriasComponent;
  let fixture: ComponentFixture<AlumnoTabsMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoTabsMateriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoTabsMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
