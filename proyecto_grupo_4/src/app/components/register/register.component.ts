import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  nombre: string = '';
  password: string = '';
  rol: string = '';

  constructor(private authService: LoginService, private router: Router) {}

  register() {
    const registerData = {
      email: this.email,
      nombre: this.nombre,
      password: this.password,
      rol: this.rol
    };

    this.authService.registerUser(registerData)
      .subscribe({
        next: (response) => {
          alert('Usuario registrado exitosamente.');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error(error);
          alert('Error al registrar el usuario.');
        }
      });
  }
}
