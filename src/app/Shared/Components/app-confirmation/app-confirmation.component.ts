import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-app-confirmation',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './app-confirmation.component.html',
  styleUrl: './app-confirmation.component.css'
})
export class AppConfirmationComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
