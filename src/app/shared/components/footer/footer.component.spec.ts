import { async, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('Footer Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();
  }));

  it('should create the footer', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const footer = fixture.componentInstance;
    expect(footer).toBeTruthy();
  });

  it('should have copyright', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const copyrightEl = fixture.debugElement.query(
      By.css('span.copyright-data')
    );
    expect(copyrightEl.nativeElement.textContent.trim()).toContain('Nitish');
  });
});
