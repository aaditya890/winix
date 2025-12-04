import { Component, HostListener } from "@angular/core";
import { NavigationEnd, Router, RouterLink, RouterOutlet } from "@angular/router";
import { filter } from "rxjs";
import { VideoSliderSectionComponent } from "./video-slider-section/video-slider-section.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  showBar = true;
  isMobileOpen = false;

  // 👇 Lazy footer variables
  showFooter = false;
  private footerTriggered = false;

  constructor(private router: Router) {
    // Always scroll to top on route change
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
  }

  // ✅ WhatsApp Chat Function
  openWhatsApp(): void {
    const message = encodeURIComponent("Hii Winixair!");
    const phone = "+918885241706";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
    window.open(whatsappUrl, "_blank");
  }

  // ✅ Enhanced Scroll Function (with mobile auto-close + route-aware behavior)
  scrollTo(id: string) {
    // Close mobile menu (if open)
    this.isMobileOpen = false;
    document.body.classList.remove("overflow-hidden");

    const header = document.querySelector("header") as HTMLElement | null;
    const headerOffset = header?.offsetHeight ?? 72;
    const extraGap = 8;

    const doScroll = () => {
      const target = document.getElementById(id);
      if (target) {
        const y =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerOffset -
          extraGap;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }
    };

    // If already on home page
    if (this.router.url === "/" || this.router.url === "/home") {
      // Add a slight delay for smoother UX
      setTimeout(() => doScroll(), 150);
    } else {
      // Navigate to home, then scroll
      this.router.navigate(["/"]).then(() => {
        setTimeout(() => doScroll(), 500); // ensure DOM loads
      });
    }
  }

  // ✅ Header Menubar Toggle Function
  toggleMobileMenu(open?: boolean) {
    this.isMobileOpen = open ?? !this.isMobileOpen;
    document.body.classList.toggle("overflow-hidden", this.isMobileOpen);
  }

  // ✅ Lazy Footer Load: show only after user scrolls down
  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.footerTriggered) return; // only once
    const scrollPos = window.scrollY || document.documentElement.scrollTop;
    const triggerPoint = window.innerHeight * 0.6; // 60% of viewport height
    if (scrollPos > triggerPoint) {
      this.footerTriggered = true;
      setTimeout(() => {
        this.showFooter = true; // footer appears after scroll
      }, 300);
    }
  }
}
