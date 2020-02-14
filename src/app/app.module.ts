import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NewsDashboardComponent } from "./news-dashboard/news-dashboard.component";
import { HttpModule } from "@angular/http";

import { NewsDetailsComponent } from "./news-details/news-details.component";
import { EditNewsComponent } from "./edit-news/edit-news.component";
import { NewsPreviewComponent } from "./news-preview/news-preview.component";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { LoginDashboardComponent } from "./login-dashboard/login-dashboard.component";
import { HeaderComponent } from "./components/header/header.component";

@NgModule({
  declarations: [
    AppComponent,
    NewsDashboardComponent,
    NewsDetailsComponent,
    EditNewsComponent,
    NewsPreviewComponent,
    LoginComponent,
    LoginDashboardComponent,
    HeaderComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
