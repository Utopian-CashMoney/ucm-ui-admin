import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {
  constructor(private httpService: HttpService, private title: Title) { }
  branches: any;
  totalBranches = 0;

  ngOnInit(): void {
    this.title.setTitle('Branches');
    this.loadAllBranches();
  }

  loadAllBranches() {
    this.httpService
    .getAll('http://localhost:8080/api/branches')
      .subscribe((res) => {
        this.branches = res;
        this.totalBranches = this.branches.length;
      });
  }
}