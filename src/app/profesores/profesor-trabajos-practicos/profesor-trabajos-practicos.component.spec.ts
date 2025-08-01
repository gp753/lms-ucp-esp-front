import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorTrabajosPracticosComponent } from './profesor-trabajos-practicos.component';

describe('ProfesorTrabajosPracticosComponent', () => {
  let component: ProfesorTrabajosPracticosComponent;
  let fixture: ComponentFixture<ProfesorTrabajosPracticosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesorTrabajosPracticosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorTrabajosPracticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
