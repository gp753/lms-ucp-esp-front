import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorListaExamenesComponent } from './administrador-lista-examenes.component';

describe('AdministradorListaExamenesComponent', () => {
  let component: AdministradorListaExamenesComponent;
  let fixture: ComponentFixture<AdministradorListaExamenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorListaExamenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorListaExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
