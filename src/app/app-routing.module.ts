import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewsDashboardComponent } from "./news-dashboard/news-dashboard.component";
import { NewsDetailsComponent } from "./news-details/news-details.component";
import { EditNewsComponent } from "./edit-news/edit-news.component";
import { NewsPreviewComponent } from "./news-preview/news-preview.component";
import { LoginDashboardComponent } from "./login-dashboard/login-dashboard.component";
import { from } from "rxjs";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "edit/:id", component: EditNewsComponent },
  { path: "home", component: NewsDashboardComponent },
  { path: "home/:pageNo", component: NewsDashboardComponent },
  { path: "detail/:id", component: NewsDetailsComponent },
  { path: "preview", component: NewsPreviewComponent },
  { path: "login", component: LoginDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
