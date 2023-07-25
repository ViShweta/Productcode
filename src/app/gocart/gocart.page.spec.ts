import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GocartPage } from './gocart.page';

describe('GocartPage', () => {
  let component: GocartPage;
  let fixture: ComponentFixture<GocartPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GocartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
