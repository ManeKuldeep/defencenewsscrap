import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsDashboardComponent } from './news-dashboard/news-dashboard.component';
import { NewsDetailsComponent } from './news-details/news-details.component';


const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "home"},
  {path: 'home', component: NewsDashboardComponent},
  {path: 'home/:pageNo', component: NewsDashboardComponent},
  {path: 'detail/:id', component: NewsDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
