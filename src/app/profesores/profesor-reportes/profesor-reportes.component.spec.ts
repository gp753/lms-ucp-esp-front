import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorReportesComponent } from './profesor-reportes.component';

describe('ProfesorReportesComponent', () => {
  let component: ProfesorReportesComponent;
  let fixture: ComponentFixture<ProfesorReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesorReportesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
