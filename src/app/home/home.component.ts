import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { DashboardDataService  } from '../shared/services/dashboarddata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string = "Admin"; //Hardcoded until admin login is implemented

  ngOnInit(): void {
  
  }

}
