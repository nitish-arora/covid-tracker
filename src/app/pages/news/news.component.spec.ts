import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NewsComponent } from './news.component';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsComponent],
    });
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
