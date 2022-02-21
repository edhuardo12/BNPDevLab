import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-summary',
  templateUrl: './dashboard-summary.component.html',
  styleUrls: ['./dashboard-summary.component.css'],
})
export class DashboardSummaryComponent implements OnInit {
  constructor(private _route: Router) {}

  ngOnInit(): void {}

  showChart(option: string, _product: string) {
    const naviExtras: NavigationExtras = {
      state: { option: option, producto: _product },
    };
    this._route.navigate(['/home/general-chart'], naviExtras);
  }
}
