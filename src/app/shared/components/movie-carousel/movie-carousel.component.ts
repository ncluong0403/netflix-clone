import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import Swiper from 'swiper';
import { IMovie } from '../../models/movie-interface';
import { ImagePipe } from '../../pipes/image.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-carousel',
  standalone: true,
  imports: [CommonModule, ImagePipe, RouterModule],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.scss',
})
export class MovieCarouselComponent implements AfterViewInit {
  @Input() movieList: IMovie[] = [];
  @Input() title!: string;

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  private initSwiper() {
    return new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 1,
      slidesPerGroup: 2,
      centeredSlides: true,
      loop: true,
      autoplay: true,
      breakpoints: {
        600: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 5,
          centeredSlides: true,
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1500: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: false,
        },
      },
    });
  }
}
