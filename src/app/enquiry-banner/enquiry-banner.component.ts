import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-enquiry-banner',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enquiry-banner.component.html',
  styleUrls: ['./enquiry-banner.component.scss']
})
export class EnquiryBannerComponent {
  /** ✅ Replace with your BG image (assets or URL) */
  @Input() bgImage = 'assets/hero/winix-bg.jpg';

  /** ✅ Replace with your WhatsApp number (no +, no spaces), e.g. 919876543210 */
  @Input() whatsappNumber = '919999999999';

  isSubmitting = signal(false);

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{7,15}$/)]],
    email: ['', [Validators.email]],
    message: ['']
  });

  constructor(private fb: FormBuilder) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);

    const { name, phone, email, message } = this.form.value;
    const lines = [
      '*New WinixAir Enquiry*',
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : '',
      message ? `Message: ${message}` : '',
      `Source: ${location.href}`
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${this.whatsappNumber}?text=${text}`;

    window.open(url, '_blank');
    this.isSubmitting.set(false);
    this.form.reset();
  }
}
