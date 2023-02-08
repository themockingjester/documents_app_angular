import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentFormComponent } from './document-form/document-form.component';
import { ListviewComponent } from './listview/listview.component';

const appRoutes: Routes = [
  { path: "", component: DocumentFormComponent },
  { path: "allItems", component: ListviewComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    DocumentFormComponent,
    ListviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
