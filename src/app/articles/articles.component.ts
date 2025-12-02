import { Component } from '@angular/core';
import { ARTICLES } from '../../../articles.data';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent {
  articles = ARTICLES;
}
