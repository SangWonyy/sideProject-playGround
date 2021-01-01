import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {ImgSlidePage} from './img-slide.page';

describe('ImgUploadPage', () => {
  let component: ImgSlidePage;
  let fixture: ComponentFixture<ImgSlidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgSlidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImgSlidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
