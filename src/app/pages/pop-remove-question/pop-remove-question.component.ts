import { Component ,  Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-pop-remove-question',
  templateUrl: './pop-remove-question.component.html',
  styleUrls: ['./pop-remove-question.component.css']
})
export class PopRemoveQuestionComponent {
  reserveId: number;
  booking: boolean= true;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<PopRemoveQuestionComponent>
    ,private _bookingService: BookingService){
      this.reserveId = data.reserveId;
    }

    //Funcion pop up de cancelar la reserva
 cancelarBooking() {
  if(this.reserveId){
    this._bookingService.cancelBooking(this.reserveId).subscribe(() => {
      this.mensajeExito();
      this.onNoClick();
      setTimeout(function(){
        window.location.reload();
     }, 2000);
    });
  }
}

onNoClick(): void {
  this.dialogRef.close();
}

mensajeExito() {
  this._snackBar.open('La reserva ha sido cancelada', '', {
    duration: 4000,
    horizontalPosition: 'right'
  });
}
}
