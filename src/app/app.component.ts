import { Component } from "@angular/core"
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})

export class AppComponent {
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

}