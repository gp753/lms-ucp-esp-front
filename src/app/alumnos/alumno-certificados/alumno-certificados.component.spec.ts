import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoCertificadosComponent } from './alumno-certificados.component';

describe('AlumnoCertificadosComponent', () => {
  let component: AlumnoCertificadosComponent;
  let fixture: ComponentFixture<AlumnoCertificadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoCertificadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoCertificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
