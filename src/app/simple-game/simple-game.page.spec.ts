import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SimpleGamePage } from './simple-game.page';

describe('SimpleGamePage', () => {
  let component: SimpleGamePage;
  let fixture: ComponentFixture<SimpleGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleGamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
