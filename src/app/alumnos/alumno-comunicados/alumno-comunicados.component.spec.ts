import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoComunicadosComponent } from './alumno-comunicados.component';

describe('AlumnoComunicadosComponent', () => {
  let component: AlumnoComunicadosComponent;
  let fixture: ComponentFixture<AlumnoComunicadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoComunicadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoComunicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
