import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NotFoundComponent } from './not-found.component';

describe('Not Found Component', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
    });
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
  });

  it('should create the not found component', () => {
    expect(component).toBeTruthy();
  });

  it('input properties should reflect on ui', () => {
    const descriptionEl = fixture.debugElement.query(
      By.css('p.error-description')
    );
    component.errorDescription = 'abc';
    fixture.detectChanges();
    expect(descriptionEl.nativeElement.textContent.trim()).toEqual('abc');
  });

  it('clicking on button should emit event', () => {
    let isEventEmitted: boolean = false;
    const buttonEl = fixture.debugElement.query(By.css('button'));

    component.buttonClick.subscribe(() => {
      isEventEmitted = true;
    });
    buttonEl.triggerEventHandler('click', null);

    expect(isEventEmitted).toBeTrue();
  });
});
