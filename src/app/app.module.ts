import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPopper } from 'angular-popper';
import { LoansComponent } from './loans/loans.component';
import { HttpService } from './shared/services/http.service';
import { BranchesComponent } from './branches/branches.component';
import { AccountsComponent } from './accounts/accounts.component';
import { UsersComponent } from './users/users.component';
import { CreateLoanComponent } from './loans/createloans.component';
import { CreateCardComponent } from './cards/createCard.component';
import {ReactiveFormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoansComponent,
    BranchesComponent,
    AccountsComponent,
    UsersComponent,
    CreateLoanComponent,
    CreateCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgxPopper,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
