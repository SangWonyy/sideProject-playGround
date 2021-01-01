import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {EditSomeThingMainPage} from './editSomething-main.page';

describe('ImgUploadPage', () => {
  let component: EditSomeThingMainPage;
  let fixture: ComponentFixture<EditSomeThingMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSomeThingMainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSomeThingMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
