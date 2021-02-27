import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthorizationService } from '../../Services/authorization.service';
import { ArrayDataSource, SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import {
  RolePermissionListItems,
  RolePermissionItem,
  UserAccountPermissions,
} from '../../DTOs/Account/Permissions/RolePermissionItem';
import { UserNotRoleDto } from '../../DTOs/Account/Permissions/UserNotRoleDto';
import { PermissionFlatNode } from 'src/app/DTOs/Account/Permissions/PermissionFlatNode';
import { parse } from 'path';

@Component({
  selector: 'app-account-permissions',
  templateUrl: './account-permissions.component.html',
  styleUrls: ['./account-permissions.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AccountPermissionsComponent implements OnInit {
  treeData: PermissionFlatNode[] = [];
  rolePermissionList: RolePermissionListItems[] = [];
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource(null);
  secondFormGroup: FormGroup;
  userId: number = 0;
  viewList: UserNotRoleDto[] = [];
  rolePermissions: UserNotRoleDto[] = [];
  displayedColumns: string[] = [
    'row',
    'firstName',
    'lastName',
    'userName',
    'roleName',
  ];
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  isLoading = false;
  expandDetail: boolean = false;
  displayedColumnspage2: string[] = ['firstName', 'lastName', 'operation'];
  items: any[] = [
    { id: 0, name: 'لطفا نقش کاربر را مشخص کنید' },
    { id: 1, name: 'مدیر سیستم' },
    { id: 2, name: 'کاربر' },
  ];
  @ViewChild('sweetAlert') private sweetAlert: SwalComponent;
  permissionData: ArrayDataSource<PermissionFlatNode>;
  jsonObject: string;
  constructor(
    private _formBuilder: FormBuilder,
    private userService: AuthorizationService
  ) {}

  treeControl = new FlatTreeControl<PermissionFlatNode>(
    (node) => node.level,
    (node) => !node.expandable
  );

  expandedElement = null;
  checklistSelection = new SelectionModel<PermissionFlatNode>(
    true /* multiple */
  );

  hasChild = (_: number, node: PermissionFlatNode) => node.expandable;
  getLevel = (node: PermissionFlatNode) => node.level;
  ngOnInit() {
    this.userService.getAllPermissions().subscribe((res): void => {
      if (res.status === 'Success') {
        // console.log(res.data);
        for (const item of res.data) {
          if (item.parentId === null) {
            this.treeData.push({
              displayTitle: item.displayTitle,
              expandable: true,
              level: 0,
              id: item.id,
              parentId: null,
              selected: item.selected,
            });
          } else if (item.parentId !== null) {
            this.treeData.push({
              displayTitle: item.displayTitle,
              level: 1,
              id: item.id,
              parentId: item.parentId,
              expandable: false,
              selected: item.selected,
            });
          }
        }
        this.permissionData = new ArrayDataSource(this.treeData);
        // console.log(this.treeData);
      }
    });

    this.userService.getUserListNotRoles().subscribe((res) => {
      if (res.status === 'Success') {
        this.viewList = res.data;
        //console.log(this.viewList);
        for (const obj of this.viewList) {
          if (obj.roleName === undefined || obj.roleName === null) {
            obj.roleName = '0';
          }
        }
        this.rolePermissions = this.viewList;
        this.dataSource = new MatTableDataSource(this.viewList);
        this.dataSource.sort = this.sort;
      }
    });
  }
  expandTree(userId: number): void {
    var rowInfo = this.rolePermissions.filter((x) => x.id == userId)[0];
    this.expandedElement = this.expandedElement === rowInfo ? null : rowInfo;
    var roleId = parseInt(
      this.viewList.filter((x) => x.id == userId)[0].roleName,
      0
    );
    if (roleId > 0) {
      if (
        this.rolePermissionList.filter((x) => x.userId == userId).length > 0
      ) {
        let selectedItems = this.rolePermissionList
                          .filter( (x) => x.userId == userId )[0].permissionFlatNode;
        // console.log(selectedItems);

        this.treeData.forEach((x) => {
          if (selectedItems.filter((d) => d.id == x.id).length > 0) {
            x.selected = selectedItems.filter((d) => d.id == x.id)[0].selected;
          }
        });
      } else {
        this.treeData.forEach((x) => (x.selected = false));
      }
    } else {
      this.expandedElement = null;
      this.sweetAlert.text = ' هنوز نقشی برای کاربر مشخص نشده است ';
      this.sweetAlert.fire();
    }
  }
  addToRolePermissionList(userId: number, tree: PermissionFlatNode[]): void {
    var selectedItems = tree.filter((x) => x.selected);
    // console.log(selectedItems);
    if (selectedItems.length > 0) {
      let mapToList: RolePermissionItem[] = [];
      selectedItems.forEach((x) => {
        mapToList.push({
          displayTitle: x.displayTitle,
          id: x.id,
          level: x.level,
          selected: x.selected,
          parentId: x.parentId,
        });
      });
      if (this.treeData.length > 0) {
        if (
          this.rolePermissionList.filter((x) => x.userId == userId).length > 0
        ) {
          this.rolePermissionList.filter(
            (x) => x.userId == userId
          )[0].permissionFlatNode = mapToList;
        } else {
          this.rolePermissionList.push(
            new RolePermissionListItems(userId, mapToList)
          );
        }
      }
    }
    // console.log("addToRolePermissionList(save button) => ",this.rolePermissionList);
  }
  submitPermission() {
    //this.onChangeUserRoleUnselect()
    this.rolePermissions = this.rolePermissions.filter(
      (x) => x.id != this.userId
    );
    this.userId = 0;
  }

  todoLeafItemSelectionToggle(node: PermissionFlatNode): void {
    var a = this.checklistSelection.toggle(node);
    node.selected = !node.selected;
    if (node.parentId === null) {
      this.treeData
        .filter((x) => x.parentId == node.id)
        .forEach((x) => (x.selected = true));
    }
    if (node.parentId === null) {
      this.treeData
        .filter((x) => x.parentId == node.id)
        .forEach((x) => (x.selected = true));
    }
    //this.checkAllParentsSelection(node);
  }

  submitRolesAndPermission() {
    // console.log(this.rolePermissionList);
    if (this.rolePermissionList.length === 0) {
      this.sweetAlert.title = ' خطا';
      this.sweetAlert.icon = 'error';
      this.sweetAlert.text =
        ' تعیین دسترسی به منوها برای هر کاربر را مشخص نمایید';
      this.sweetAlert.fire();
    } else {
      this.isLoading = true;
      var output = new UserAccountPermissions(
        this.viewList,
        this.rolePermissionList
      );
      this.userService
        .setAllUsersAccountPermissions(output)
        .subscribe((res) => {
          // console.log(res);
          this.sweetAlert.text = ' تغییرات با موفقیت انجام شد';
          this.sweetAlert.title = ' توجه';
          this.sweetAlert.icon = 'success';
          this.sweetAlert.fire();
          this.rolePermissionList =[];
          this.isLoading = false;
        });
    }
  }
}
