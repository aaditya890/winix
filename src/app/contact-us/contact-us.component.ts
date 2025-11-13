import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  emailText: string = "care@justshop24x7.com";
  whatsappNumber = '918885241706'; // ✅ Replace with your number
    isSubmitting = signal(false);
  
    form: FormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,}$/)]],
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
        '*Hi, WinixAir!*',
        `Name: ${name}`,
        `Phone: ${phone}`,
        email ? `Email: ${email}` : '',
        message ? `Message: ${message}` : ''
      ].filter(Boolean);
  
      const text = encodeURIComponent(lines.join('\n'));
      const url = `https://wa.me/${this.whatsappNumber}?text=${text}`;
  
      window.open(url, '_blank');
  
      this.isSubmitting.set(false);
      this.form.reset();
    }
}
