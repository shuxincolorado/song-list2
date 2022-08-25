import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Songs3Component } from './songs3.component';

describe('Songs3Component', () => {
  let component: Songs3Component;
  let fixture: ComponentFixture<Songs3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Songs3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Songs3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
