import { Injectable } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

@Injectable({ providedIn: 'root' })
export class ToastService {

  show(message: string, type: ToastType = 'info') {
    const toast = document.createElement('div');

    toast.innerText = message;

    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '12px 16px';
    toast.style.borderRadius = '8px';
    toast.style.color = '#fff';
    toast.style.zIndex = '9999';
    toast.style.fontFamily = 'Arial';
    toast.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';

    switch (type) {
      case 'success':
        toast.style.background = '#2e7d32';
        break;
      case 'error':
        toast.style.background = '#c62828';
        break;
      case 'warning':
        toast.style.background = '#ed6c02';
        break;
      default:
        toast.style.background = '#1565c0';
    }

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  success(msg: string) { this.show(msg, 'success'); }
  error(msg: string) { this.show(msg, 'error'); }
  info(msg: string) { this.show(msg, 'info'); }
  warning(msg: string) { this.show(msg, 'warning'); }
}