import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorEncuestasComponent } from './administrador-encuestas.component';

describe('AdministradorEncuestasComponent', () => {
  let component: AdministradorEncuestasComponent;
  let fixture: ComponentFixture<AdministradorEncuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorEncuestasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorEncuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
