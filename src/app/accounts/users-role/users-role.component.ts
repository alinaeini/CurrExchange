import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { AuthorizationService } from 'src/app/Services/authorization.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserNotRoleDto } from 'src/app/DTOs/Account/Permissions/UserNotRoleDto';

@Component({
  selector: 'app-users-role',
  templateUrl: './users-role.component.html',
  styleUrls: ['./users-role.component.scss']
})
export class UsersRoleComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource(null);
  viewList: UserNotRoleDto[] = [];
  
  displayedColumns: string[] = [
    'row',
    'firstName',
    'lastName',
    'userName',
    'userRole',
  ];
  items: any[] = [
    { id: 0, name: 'لطفا نقش کاربر را مشخص کنید' },
    { id: 1, name: 'مدیر سیستم' },
    { id: 2, name: 'کاربر' },
  ];
  constructor( private userService: AuthorizationService) { }

  ngOnInit(): void {
    this.userService.getUserListNotRoles().subscribe((res): void => {
      if (res.status === 'Success') {
        this.viewList = res.data;
        for (const obj of this.viewList) {
          if (obj.roleName === undefined || obj.roleName === null) {
            obj.roleName = '0';
          }
        }
        this.dataSource = new MatTableDataSource(this.viewList);
        this.dataSource.sort = this.sort;
      }
    });
  }
  submitRolesAndPermission() {
    console.log(this.viewList);
  }

}
