import { Component, OnInit } from '@angular/core';
import { CurrentUserDto } from 'src/app/DTOs/Account/CurrentUserDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: CurrentUserDto;
  constructor(

  ) {}

  ngOnInit(): void {
  }


}
