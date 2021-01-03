import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlaygroundMainPage } from './playground-main.page';

describe('PlaygroundMainPage', () => {
  let component: PlaygroundMainPage;
  let fixture: ComponentFixture<PlaygroundMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaygroundMainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaygroundMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
