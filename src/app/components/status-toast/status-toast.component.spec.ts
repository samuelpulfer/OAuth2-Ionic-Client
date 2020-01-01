import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatusToastComponent } from './status-toast.component';

describe('StatusToastComponent', () => {
  let component: StatusToastComponent;
  let fixture: ComponentFixture<StatusToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusToastComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
