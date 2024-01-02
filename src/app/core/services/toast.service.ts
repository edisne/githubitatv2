import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackbar: MatSnackBar) { }

  success(message: string) {
    this.snackbar.open(message, "Close", { panelClass: ['snackbar-success'], duration: 2000 })
  }

  error(message: string) {
    this.snackbar.open(message, "Close", { panelClass: ['snackbar-error'], duration: 2000 })
  }
}
