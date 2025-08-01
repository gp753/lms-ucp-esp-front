import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorGruposComponent } from './administrador-grupos.component';

describe('AdministradorGruposComponent', () => {
  let component: AdministradorGruposComponent;
  let fixture: ComponentFixture<AdministradorGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorGruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
