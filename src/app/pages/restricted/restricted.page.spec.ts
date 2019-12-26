import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RestrictedPage } from './restricted.page';

describe('RestrictedPage', () => {
  let component: RestrictedPage;
  let fixture: ComponentFixture<RestrictedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestrictedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RestrictedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
