import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoInformacionFundamentalComponent } from './alumno-informacion-fundamental.component';

describe('AlumnoInformacionFundamentalComponent', () => {
  let component: AlumnoInformacionFundamentalComponent;
  let fixture: ComponentFixture<AlumnoInformacionFundamentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoInformacionFundamentalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoInformacionFundamentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
