import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {
  constructor(private httpService: HttpService) { }
  branches: any;
  totalBranches = 0;

  ngOnInit(): void {
    this.loadAllBranches();
  }

  loadAllBranches() {
    this.httpService
    .getAll('http://localhost:8010/api/branches')
      .subscribe((res) => {
        this.branches = res;
        this.totalBranches = this.branches.length;
      });
  }

  getNumBranches() {
    return this.totalBranches;
  }
}
