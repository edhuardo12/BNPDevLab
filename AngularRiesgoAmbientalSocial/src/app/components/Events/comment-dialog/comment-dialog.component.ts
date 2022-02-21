import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css'],
})
export class CommentDialogComponent implements OnInit {
  commentDataForm!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CommentDialogComponent>
  ) {}

  ngOnInit(): void {
    this.commentDataForm = this._formBuilder.group({
      commentCtrl: [
        '',
        [
          Validators.required,
          Validators.maxLength(256),
          Validators.minLength(5),
        ],
      ],
    });
  }
  commentsOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode == 44) {
      return false;
    }
    return true;
  }

  closeDialog() {
    let comment = this.commentDataForm.controls['commentCtrl'].value;
    this.dialogRef.close({ event: comment });
  }
}
