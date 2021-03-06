import { Component, OnInit } from '@angular/core';
import { DomainName } from 'src/app/Utilities/pathTools';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.scss']
})
export class PrintPageComponent implements OnInit {

  public domain: string = DomainName;
  constructor() { }

  ngOnInit(): void {
    // window.print();
  }

}
