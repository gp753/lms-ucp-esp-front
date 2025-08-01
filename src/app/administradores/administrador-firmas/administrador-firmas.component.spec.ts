import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorFirmasComponent } from './administrador-firmas.component';

describe('AdministradorFirmasComponent', () => {
  let component: AdministradorFirmasComponent;
  let fixture: ComponentFixture<AdministradorFirmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorFirmasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorFirmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
