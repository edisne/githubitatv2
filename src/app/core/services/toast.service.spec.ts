import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ToastService', () => {
  let service: ToastService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      // Provide both the service and the mock dependency
      providers: [
        ToastService,
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });

    service = TestBed.inject(ToastService);
  });

  it('should open a success snack bar when success is called', () => {
    const message = 'Success message';
    service.success(message);

    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'Close', { panelClass: ['snackbar-success'], duration: 2000 });
  });

  it('should open an error snack bar when error is called', () => {
    const message = 'Error message';
    service.error(message);

    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'Close', { panelClass: ['snackbar-error'], duration: 2000 });
  });
});
