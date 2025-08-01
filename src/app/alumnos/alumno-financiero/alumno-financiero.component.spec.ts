import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoFinancieroComponent } from './alumno-financiero.component';

describe('AlumnoFinancieroComponent', () => {
  let component: AlumnoFinancieroComponent;
  let fixture: ComponentFixture<AlumnoFinancieroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoFinancieroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
