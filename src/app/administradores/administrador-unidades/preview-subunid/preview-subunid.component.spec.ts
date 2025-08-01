import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSubunidComponent } from './preview-subunid.component';

describe('PreviewSubunidComponent', () => {
  let component: PreviewSubunidComponent;
  let fixture: ComponentFixture<PreviewSubunidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewSubunidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewSubunidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
