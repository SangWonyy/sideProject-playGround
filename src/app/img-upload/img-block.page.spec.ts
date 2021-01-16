import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {ImgBlockPage} from "./img-block.page";

describe('ImgBlockPage', () => {
  let component: ImgBlockPage;
  let fixture: ComponentFixture<ImgBlockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgBlockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImgBlockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
