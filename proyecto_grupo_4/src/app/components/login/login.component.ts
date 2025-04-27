import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router , private authService: LoginService) {}

  login() {
    this.authService.login(this.email, this.password)
      .subscribe({
        next: (response) => {
          sessionStorage.setItem('token', response.token);
          this.router.navigate(['/productos']);
        },
        error: (error) => {
          console.error(error);
          alert('Correo o contraseña incorrectos');
        }
      });
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
