import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NoLoginComponent } from './components/no-login/no-login.component';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as AppReducers from './data/app.reducers';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { RateModalComponent } from './components/rate-modal/rate-modal.component';
import { LoadingBallsComponent } from './components/loading-balls/loading-balls.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NoLoginComponent,
    CardComponent,
    FooterComponent,
    GameDetailsComponent,
    RateModalComponent,
    LoadingBallsComponent,
    SafeUrlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(AppReducers, {}),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
