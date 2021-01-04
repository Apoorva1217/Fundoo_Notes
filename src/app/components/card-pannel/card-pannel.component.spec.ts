import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPannelComponent } from './card-pannel.component';

describe('CardPannelComponent', () => {
  let component: CardPannelComponent;
  let fixture: ComponentFixture<CardPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
