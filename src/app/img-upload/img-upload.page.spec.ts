import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

describe('ImgUploadPage', () => {
  let component: ImgUploadPage;
  let fixture: ComponentFixture<ImgUploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgUploadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImgUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
