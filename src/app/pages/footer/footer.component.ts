import { Component, HostListener } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class FooterComponent {
  showFooter = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Verificar si el footer está en el viewport (visible en la ventana)
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      const rect = footerElement.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      this.showFooter = rect.top <= windowHeight;
    }
  }
}
