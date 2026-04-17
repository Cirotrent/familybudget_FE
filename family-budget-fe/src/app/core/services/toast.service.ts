import { Injectable } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {

  private toasts: Toast[] = [];
  private counter = 0;

  getAll() {
    return this.toasts;
  }

  show(message: string, type: ToastType = 'info') {
    const toast: Toast = {
      id: ++this.counter,
      message,
      type
    };

    this.toasts.push(toast);

    setTimeout(() => {
      this.remove(toast.id);
    }, 8000);
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  success(msg: string) { this.show(msg, 'success'); }
  error(msg: string) { this.show(msg, 'error'); }
  info(msg: string) { this.show(msg, 'info'); }
  warning(msg: string) { this.show(msg, 'warning'); }
}