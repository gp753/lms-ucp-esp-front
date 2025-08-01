import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoBienvenidaMateriaComponent } from './alumno-bienvenida-materia.component';

describe('AlumnoBienvenidaMateriaComponent', () => {
  let component: AlumnoBienvenidaMateriaComponent;
  let fixture: ComponentFixture<AlumnoBienvenidaMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoBienvenidaMateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoBienvenidaMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
