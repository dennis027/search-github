// material.module.ts
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';  
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; 
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [  
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule, 
    FormsModule,
    CommonModule,
    MatTooltipModule,
    MatSnackBarModule,
    ClipboardModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule, 
    FormsModule,
    MatTooltipModule,
    MatSnackBarModule,
    ClipboardModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressSpinnerModule,
  ],
})
export class MaterialModule {}
