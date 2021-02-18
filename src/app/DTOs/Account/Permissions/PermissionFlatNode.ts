export interface PermissionFlatNode {
    displayTitle: string;
    expandable: boolean;
    level: number;
    isExpanded?: boolean;
    id: number;
    parentId?: number;
    selected: boolean;
}
