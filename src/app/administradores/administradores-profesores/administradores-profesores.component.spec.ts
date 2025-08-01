import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradoresProfesoresComponent } from './administradores-profesores.component';

describe('AdministradoresProfesoresComponent', () => {
  let component: AdministradoresProfesoresComponent;
  let fixture: ComponentFixture<AdministradoresProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradoresProfesoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradoresProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
