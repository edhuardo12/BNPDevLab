import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-omniturno-sumary',
  templateUrl: './omniturno-sumary.component.html',
  styleUrls: ['./omniturno-sumary.component.css'],
})
export class OmniturnoSumaryComponent implements OnInit {
  constructor(private _route: Router) {}

  ngOnInit(): void {}

  showChart(option: string, _product: string) {
    const naviExtras: NavigationExtras = {
      state: { option: option, producto: _product },
    };
    this._route.navigate(['/home/omni-chart'], naviExtras);
  }
}
