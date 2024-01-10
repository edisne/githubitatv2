import { NgModule } from "@angular/core";
import { RepositoryCardComponent } from "./repository-card/repository-card.component";
import { UserCardComponent } from "./user-card/user-card.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        UserCardComponent,
        RepositoryCardComponent,
    ],
    imports: [
        CommonModule,
        MatSliderModule,
        MatCardModule,
        MatChipsModule,
        MatDatepickerModule,
        MatButtonModule,
        MatIconModule,
        MatNativeDateModule,
        MatInputModule,
        MatSnackBarModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatPaginatorModule,
        MatTabsModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatSidenavModule,
        MatSlideToggleModule,
    ],
    exports: [
        UserCardComponent,
        RepositoryCardComponent,
    ]
  })
  export class SharedModule { } 