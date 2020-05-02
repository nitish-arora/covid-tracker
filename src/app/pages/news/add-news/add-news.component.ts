import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

/* --- local dependencies -- */
import { NewsService } from '../services/news.service';
import { APP_ROUTES } from 'src/app/shared/config/routes.config';

/**
 * component for showing add news form
 */
@Component({
  selector: 'app-add-news',
  templateUrl: 'add-news.component.html',
  styleUrls: ['./add-news.component.css'],
})
export class AddNewsComponent {
  title: string = 'Add News';
  addNewsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private newsService: NewsService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.createNewsForm();
  }

  /**
   * method called for creating the news form and applying validations
   */
  createNewsForm() {
    this.addNewsForm = this.fb.group({
      title: ['', [Validators.required]],
      summary: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      fullArticle: ['', [Validators.required]],
    });
  }

  /**
   * method to be called on submitting the news form
   */
  addNews() {
    if (this.addNewsForm.valid) {
      this.newsService.saveNews(this.addNewsForm.value).subscribe(() => {
        this.toastrService.success('News added successfully');
        this.router.navigate([`/${APP_ROUTES.NEWS}`]);
      });
    }
  }

  /**
   * method for redirecting to the latest news page
   */
  goToNews() {
    this.router.navigate([`/${APP_ROUTES.NEWS}`]);
  }
}
