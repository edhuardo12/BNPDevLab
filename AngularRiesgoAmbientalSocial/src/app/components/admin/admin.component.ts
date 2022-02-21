import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationDialogComponent } from '../Events/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  username!: string;
  intro = true;
  child = false;
  opened = true;
  constructor(public dialog: MatDialog, private auth: AuthService) {}

  ngOnInit(): void {
    this.intro = true;
    this.child = false;
  }

  changeViewtoChild(show: boolean) {
    if (show) {
      this.intro = false;
      this.child = true;
    } else {
      this.intro = true;
      this.child = false;
    }
  }

  openConfirmationDialog(title: string, content: string) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: title, content: content },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.auth.signOut();
      }
    });
  }
}
