import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CanComponentDeactivate } from '../interfaces/can-component-deactivate';

@Injectable({
  providedIn: 'root'
})
export class LeavePageGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(
    private dialog: MatDialog
  ){}

  async canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Promise<boolean> {
      if (component.hasUnsavedChanges() && !component.isSubmited) {
        // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        //   data: {
        //     type: 'leave',
        //     header: 'Unsaved changes'
        //   }
        // })
        // return await dialogRef.afterClosed().toPromise();
      }

    return true;
  }
  
}
