import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MovieSearchComponent } from './movie-search/movie-search.component';

import { StoreModule } from '@ngrx/store';
import { SearchReducer } from './shared/store/store.reducer';
import { MovieDashboardComponent } from './movie-dashboard/movie-dashboard.component';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({ movies: SearchReducer }),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    MovieSearchComponent,
    MovieDetailComponent,
    MovieDashboardComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }