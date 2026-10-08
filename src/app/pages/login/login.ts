import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, NgZone, signal, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login-service';
import { LoginRequest } from '../../Model/loginRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements AfterViewInit {
  @ViewChild('captchaCanvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  generatedCode = signal<string>('');
  captchaInput = signal<string>('');
  // Use signals for UI state
  hidePassword = signal(true);

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef, private LoginService: LoginService, private router: Router) { }

  private fb = inject(FormBuilder);

  ngAfterViewInit() {
    this.initCaptcha();
  }

  initCaptcha() {
    // Generate the code first
    const code = this.generateRandomCode(6);
    this.generatedCode.set(code);

    // 3. Force Angular to detect changes so the #captchaCanvas is bound
    this.cdr.detectChanges();

    // 4. Draw with a tiny delay to ensure the browser has 'painted' the element
    setTimeout(() => {
      this.drawCaptcha(this.generatedCode());
    }, 50);
  }



  private generateRandomCode(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  }

  drawCaptcha(code: string) {
    // 1. Safety Check: Ensure canvas exists
    if (!this.canvas || !this.canvas.nativeElement) return;

    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 2. Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 3. Background Style
    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 4. Add some "noise" lines to prevent bot scraping
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = this.getRandomColor();
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // 5. Draw the Text
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#3f51b5'; // Your primary theme color
    ctx.textBaseline = 'middle';

    // Draw characters with slight random rotation/positioning
    const startX = 10;
    for (let i = 0; i < code.length; i++) {
      const x = startX + (i * 18);
      const y = 20 + Math.random() * 5;
      ctx.fillText(code[i], x, y);
    }
  }

  private getRandomColor() {
    return `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255}, 0.3)`;
  }

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    captcha: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.value.captcha === this.generatedCode()) {
      const payload = this.loginForm.value as LoginRequest;

      //generate a token code
      this.LoginService.generateToken(payload).subscribe(
        {
          next: (response: any) => {
            this.LoginService.loginUser(response.token);

            this.LoginService.currentUser().subscribe({
              next: (user: any) => {

                this.LoginService.setUser(user);

                if (this.LoginService.getUserRoll() == 'ADMIN') {
                  //window.location.href="/dashboard"
                  this.router.navigate(['/admin'], { replaceUrl: true });
                } else if (this.LoginService.getUserRoll() == 'NORMAL') {
                  this.router.navigate(['/user']);
                }
                else {
                  this.LoginService.logout();
                }

              }, error: (err) => {

                alert(err);
              }
            })
          }, error: (err) => {
           alert(err.error.message);
          }
        }
      )
    } else {
      alert('Invalid Captcha Code!');
      this.loginForm.get('captcha')?.reset();
    }
  }

  togglePassword(event: MouseEvent) {
    this.hidePassword.update(prev => !prev);
    event.preventDefault();
  }

  refreshCaptcha() {
    this.initCaptcha();
  }

}
