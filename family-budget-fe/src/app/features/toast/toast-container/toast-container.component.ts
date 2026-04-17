import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div
        *ngFor="let t of toastService.getAll()"
        class="toast"
        [ngClass]="t.type"
      >
        {{ t.message }}
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 99999;
    }

    .toast {
      padding: 12px 16px;
      border-radius: 8px;
      color: white;
      font-family: Arial;
      min-width: 220px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.2);
      animation: slideIn 0.25s ease-out;
    }

    .success { background: #2e7d32; }
    .error { background: #c62828; }
    .info { background: #1565c0; }
    .warning { background: #ed6c02; }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}
}