import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DisplayComponent } from './components/display/display.component';
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
import { LoginComponent } from './components/login/login.component';
import { Interceptor } from './services/interceptor.service';
import { AddGameComponent } from './components/add-game/add-game.component';
import { DeletionModalComponent } from './components/deletion-modal/deletion-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DisplayComponent,
    CardComponent,
    FooterComponent,
    GameDetailsComponent,
    RateModalComponent,
    LoadingBallsComponent,
    SafeUrlPipe,
    LoginComponent,
    AddGameComponent,
    DeletionModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(AppReducers, {}),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
