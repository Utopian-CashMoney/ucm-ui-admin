import { HtmlParser } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCardsComponent } from './cards/view-cards/view-cards.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ViewLoansComponent } from './loans/view-loans/view-loans.component';

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
        path: 'cashmoney/admin/cards/view',
        component: ViewCardsComponent,
      },
      {
        path: 'cashmoney/admin/loans/view',
        component: ViewLoansComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
