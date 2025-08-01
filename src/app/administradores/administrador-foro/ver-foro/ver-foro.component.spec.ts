import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerForoComponent } from './ver-foro.component';

describe('VerForoComponent', () => {
  let component: VerForoComponent;
  let fixture: ComponentFixture<VerForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerForoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
