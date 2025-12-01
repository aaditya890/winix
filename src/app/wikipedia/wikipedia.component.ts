import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WINIX_DETAIL_DATA } from '../../../insight-data';

@Component({
  selector: 'app-wikipedia',
  standalone: true,
  imports: [],
  templateUrl: './wikipedia.component.html',
  styleUrl: './wikipedia.component.scss'
})
export class WikipediaComponent {
  data: any;

  constructor(private route: ActivatedRoute) {
    const slug = this.route.snapshot.params['slug'];
    this.data = WINIX_DETAIL_DATA[slug];
  }

  getBullets(text: string) {
  return text
    .split("•")
    .slice(1)
    .map(b => b.trim())
    .filter(b => b.length > 0);
}

}
