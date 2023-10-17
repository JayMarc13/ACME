import { Component, ElementRef,OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { ImageService } from 'src/app/services/ImageService ';

@Component({
  selector: 'app-change-p-profile-picture',
  templateUrl: 'change.p.profile.picture.component.html',
  styleUrls: ['change.p.profile.picture.component.css']
})
export class ChangePProfilePictureComponent implements OnInit {
  url: string ="";
  constructor(
    private imageService: ImageService,
    private elementRef: ElementRef,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ChangePProfilePictureComponent>,
    private snackBar: MatSnackBar) {

      
      
    }


    ngOnInit() {
    this.url= this.imageService.getImageUrl();
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onselectedFile(e: any) {
      if (e.target.files) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (event: any) => {
          this.url = event.target.result;
          this.imageService.setImageUrl(this.url); // Guarda la URL en el servicio
        }
      }
    }
    
}
