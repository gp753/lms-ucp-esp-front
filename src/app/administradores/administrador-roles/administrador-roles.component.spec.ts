import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorRolesComponent } from './administrador-roles.component';

describe('AdministradorRolesComponent', () => {
  let component: AdministradorRolesComponent;
  let fixture: ComponentFixture<AdministradorRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
