import { Component, Input, SimpleChanges } from '@angular/core';
import { SafePipe } from '../../../shared/pipes/safe.pipe';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @Input({ required: true }) bannerDetail!: any;
  @Input({ required: true }) bannerVideo!: any;
  videoUrl: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bannerVideo']?.currentValue?.id) {
      const key = changes['bannerVideo']?.currentValue.results.pop().key;
      this.videoUrl = `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=1&controls=0&playlist=${key}`;
    }
  }
}
