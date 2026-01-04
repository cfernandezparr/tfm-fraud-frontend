import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  fullName = '';
  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.authService.register(this.fullName, this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.error = 'Error al registrar el usuario';
      }
    });
  }
}
