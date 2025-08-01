import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoContinuarUnidadComponent } from './alumno-continuar-unidad.component';

describe('AlumnoContinuarUnidadComponent', () => {
  let component: AlumnoContinuarUnidadComponent;
  let fixture: ComponentFixture<AlumnoContinuarUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoContinuarUnidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoContinuarUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
