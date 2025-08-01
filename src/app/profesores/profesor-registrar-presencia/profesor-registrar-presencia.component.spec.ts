import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorRegistrarPresenciaComponent } from './profesor-registrar-presencia.component';

describe('ProfesorRegistrarPresenciaComponent', () => {
  let component: ProfesorRegistrarPresenciaComponent;
  let fixture: ComponentFixture<ProfesorRegistrarPresenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesorRegistrarPresenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorRegistrarPresenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
