import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreditorComponent } from './freditor.component';

describe('FreditorComponent', () => {
  let component: FreditorComponent;
  let fixture: ComponentFixture<FreditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
