import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmministradorReportesComponent } from './admministrador-reportes.component';

describe('AdmministradorReportesComponent', () => {
  let component: AdmministradorReportesComponent;
  let fixture: ComponentFixture<AdmministradorReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmministradorReportesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmministradorReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
