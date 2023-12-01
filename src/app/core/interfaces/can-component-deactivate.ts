import { Observable } from "rxjs";

export interface CanComponentDeactivate {
    hasUnsavedChanges: () => Observable <boolean> | Promise <boolean> | boolean;
    isSubmited: boolean;
}
