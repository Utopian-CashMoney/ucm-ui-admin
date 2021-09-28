import { Injectable } from '@angular/core';

@Injectable()
export class DashboardDataService {

  dashboarddata: any[];
  constructor() { this.dashboarddata = []}

   get data(): any{
    return this.dashboarddata;
  }

  set data(val: any){
    this.dashboarddata = val;
    console.log(this.dashboarddata);
  }

}