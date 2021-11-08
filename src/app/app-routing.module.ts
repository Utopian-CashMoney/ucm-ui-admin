import { HtmlParser } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesComponent } from './branches/branches.component';
import { CardsComponent } from './cards/cards.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoansComponent } from './loans/loans.component';
import { AccountsComponent } from './accounts/accounts.component';
import { UsersComponent } from './users/users.component';
import { CreateLoanComponent } from './loans/createloans.component';
import { CreateCardComponent } from './cards/createCard.component';
import { ConfirmDialogComponent } from './confirmDialog/confirmDialog.component';
import { EditUserComponent } from './users/editUser.component';
import { AddUserComponent } from './users/addUser.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'cashmoney/admin/home',
        pathMatch: 'full',
      },
      {
        path: 'cashmoney/admin/home',
        component: HomeComponent,
      },
      {
        path: 'cashmoney/admin/users',
        component: UsersComponent,
      },
      {
        path: 'cashmoney/admin/accounts',
        component: AccountsComponent,
      },
      {
        path: 'cashmoney/admin/cards',
        component: CardsComponent,
      },
      {
        path: 'cashmoney/admin/loans',
        component: LoansComponent,
      },
      {
        path: 'cashmoney/admin/branches',
        component: BranchesComponent,
      },
      {
        path: 'cashmoney/admin/createLoans',
        component: CreateLoanComponent,
      },
      {
        path: 'cashmoney/admin/create_card',
        component: CreateCardComponent,
      },
      {
        path: 'cashmoney/admin/confirm_loan',
        component: ConfirmDialogComponent,
      },
      {
        path: 'cashmoney/admin/edit_user',
        component: EditUserComponent,
      },
      {
        path: 'cashmoney/admin/add_user',
        component: AddUserComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
