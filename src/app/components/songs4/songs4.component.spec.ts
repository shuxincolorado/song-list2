import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Songs4Component } from './songs4.component';

describe('Songs4Component', () => {
  let component: Songs4Component;
  let fixture: ComponentFixture<Songs4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Songs4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Songs4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
