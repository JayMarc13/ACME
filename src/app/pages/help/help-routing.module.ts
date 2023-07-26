import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { helpComponent } from './help.component';

const routes: Routes = [
  { path: '', component: helpComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
