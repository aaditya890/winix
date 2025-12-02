import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ARTICLES } from '../../../articles.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent {
  slug: string = '';
  article: any = null;
  emailText = "care@justshop24x7.com"

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.article = ARTICLES.find(a => a.slug === this.slug);
  }

  constructor(private route: ActivatedRoute) {}
}
