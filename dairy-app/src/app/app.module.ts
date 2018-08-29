import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { CommentsListComponent } from './comments-list/comments-list.component';

import { ItemsService } from './service/items.service';
import { CommentsService } from './service/comments.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    CommentsListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ItemsService,
    CommentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
