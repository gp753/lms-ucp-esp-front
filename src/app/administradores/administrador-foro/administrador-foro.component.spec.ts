import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorForoComponent } from './administrador-foro.component';

describe('AdministradorForoComponent', () => {
  let component: AdministradorForoComponent;
  let fixture: ComponentFixture<AdministradorForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorForoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
