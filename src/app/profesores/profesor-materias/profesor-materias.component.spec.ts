import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorMateriasComponent } from './profesor-materias.component';

describe('ProfesorMateriasComponent', () => {
  let component: ProfesorMateriasComponent;
  let fixture: ComponentFixture<ProfesorMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesorMateriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
