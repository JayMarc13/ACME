import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCityComponent } from './lista-city.component';

describe('ListaCityComponent', () => {
  let component: ListaCityComponent;
  let fixture: ComponentFixture<ListaCityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaCityComponent]
    });
    fixture = TestBed.createComponent(ListaCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
