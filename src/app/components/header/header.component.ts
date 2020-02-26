import { Component, OnInit } from "@angular/core";
import { AppComponent } from "../../app.component";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styles: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isLogin: Boolean;
  constructor(public appComponent: AppComponent, public router: Router) {}
  ngOnInit() {
    this.isLogin = false;
    this.checkStatusOfUser();
  }
  openModal() {
    this.appComponent.openModal();
  }
  closeModal() {
    this.appComponent.closeModal();
  }
  addNewArticle() {}
  logoutPressed() {
    this.router.navigate([`/home`]);
  }
  checkStatusOfUser() {
    let loginStatus = localStorage.getItem("LoginStatus");
    if (loginStatus == "true") {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
}
