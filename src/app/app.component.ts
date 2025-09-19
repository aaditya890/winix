import { Component } from "@angular/core"
import { NavigationEnd, Router, RouterLink, RouterOutlet } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})

export class AppComponent {
   showBar = true;
  isMobileOpen = false;
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
  }

  // Function to open WhatsApp chat
  openWhatsApp(): void {
    const message = encodeURIComponent("Hii Winixair!");
    const phone = "+918885241706";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
    window.open(whatsappUrl, '_blank');
  }

  scrollTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  // sticky header ki actual height le lo (desktop/mobile dono me theek rahe)
  const header = document.querySelector('header') as HTMLElement | null;
  const headerOffset = header?.offsetHeight ?? 72;   // adjust if needed
  const extraGap = 8;                                // thoda sa breathing space
  const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset - extraGap;

  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
}

  // Header Menubar Toggle Code
  toggleMobileMenu(open?: boolean) {
    this.isMobileOpen = open ?? !this.isMobileOpen;
    document.body.classList.toggle('overflow-hidden', this.isMobileOpen); // stop bg scroll
  }

}