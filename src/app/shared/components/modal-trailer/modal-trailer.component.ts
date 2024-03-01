import { Component, Input, SimpleChanges } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-modal-trailer',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './modal-trailer.component.html',
  styleUrl: './modal-trailer.component.scss',
})
export class ModalTrailerComponent {
  @Input({ required: true }) videoKey: string = '';

  videoUrl: string = '';

  ngOnInit(): void {
    initFlowbite();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['videoKey']?.currentValue) {
      this.videoUrl = `https://www.youtube.com/embed/${this.videoKey}?&mute=1&controls=1`;
    }
  }
}
