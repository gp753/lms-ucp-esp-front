import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerFinanciamientoComponent } from './ver-financiamiento.component';

describe('VerFinanciamientoComponent', () => {
  let component: VerFinanciamientoComponent;
  let fixture: ComponentFixture<VerFinanciamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerFinanciamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerFinanciamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
