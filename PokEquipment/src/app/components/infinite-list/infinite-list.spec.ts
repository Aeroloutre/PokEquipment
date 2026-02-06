import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteList } from './infinite-list';

describe('InfiniteList', () => {
  let component: InfiniteList;
  let fixture: ComponentFixture<InfiniteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfiniteList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfiniteList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
