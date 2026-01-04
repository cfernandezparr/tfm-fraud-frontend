import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

import { OperationsService } from '../../../core/services/operations.service';
import { AuthService } from '../../../core/services/auth.service';
import { Operation } from '../../../core/models/operation.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  operations: Operation[] = [];

  constructor(
    private operationsService: OperationsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOperations();
  }


  loadOperations(): void {
    this.operationsService.getAll().subscribe({
      next: data => this.operations = data
    });
  }


  get totalOperations(): number {
    return this.operations.length;
  }

  get suspiciousOperations(): number {
    return this.operations.filter(op => op.isFraudFlag === 1).length;
  }

  get riskPercentage(): number {
    if (this.totalOperations === 0) return 0;
    return Math.round((this.suspiciousOperations / this.totalOperations) * 100);
  }

  get normalPercentage(): number {
    return 100 - this.riskPercentage;
  }

  get suspiciousAngle(): number {
    return (this.riskPercentage / 100) * 360;
  }


  isSuspicious(op: Operation): boolean {
    return op.isFraudFlag === 1;
  }

  canReject(): boolean {
    return this.authService.isAdmin();
  }


  rejectOperation(id: number): void {
    if (!confirm('¿Seguro que quieres rechazar esta operación?')) return;

    this.operationsService.delete(id).subscribe({
      next: () => {
        this.operations = this.operations.filter(op => op.id !== id);
      },
      error: err => {
        if (err.status === 403) {
          alert('No tienes permisos para realizar esta acción');
        }
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
