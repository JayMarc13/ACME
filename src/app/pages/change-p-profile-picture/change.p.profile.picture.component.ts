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
  constructor(
    private imageService: ImageService,
    private elementRef: ElementRef,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ChangePProfilePictureComponent>,
    private snackBar: MatSnackBar) {
      
    }

    url="https://imgs.search.brave.com/MWlI8P3aJROiUDO9A-LqFyca9kSRIxOtCg_Vf1xd9BA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc";


    ngOnInit() {
    this.imageService.setImageUrl(this.url);
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
