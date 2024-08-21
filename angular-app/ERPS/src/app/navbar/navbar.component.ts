import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  constructor() {} // empty means no initialization is required when an instance of this component is created

  // built in function for any initialization logic. called when the component is initialized
  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      this.onWindowScroll();
    }
  }

  // Decorator that listens to the host for given event
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (typeof document !== 'undefined') { // Ensures that the code is runnning in the browser and not the server
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) { // If scrolled more than 50px, the scrolled class is added to navbar
        navbar?.classList.add('scrolled'); // The ? is to check if navbar is null or undefined. If not, it executes
      } else {
        navbar?.classList.remove('scrolled');
      }
    }
  }
}
