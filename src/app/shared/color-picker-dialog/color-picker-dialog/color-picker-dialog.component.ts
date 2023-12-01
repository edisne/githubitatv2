import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-color-picker-dialog',
  templateUrl: './color-picker-dialog.component.html',
  styleUrls: ['./color-picker-dialog.component.scss']
})
export class ColorPickerDialogComponent implements OnInit {
onColorChange($event: Event) {
throw new Error('Method not implemented.');
}

  selectedColor: any;
  constructor(public dialogRef: MatDialogRef<ColorPickerDialogComponent>,) { }

  ngOnInit(): void {
  }
  onConfirm() {
    this.dialogRef.close(this.selectedColor);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
