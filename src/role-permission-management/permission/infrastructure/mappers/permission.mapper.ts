export class PermissionMapper {
    static toDomain(permissions) {
        return permissions.map(permission => this.mapItem(permission, permissions));
    }

    static mapItem(source, allPermissions) {
        const { id, code, parentId, description } = source;
        const permissionObj = {
            id,
            permission_name: code,
            description,
            children: []
        };

        if (parentId) {
            // Find the parent permission object
            const parentPermission = allPermissions.find(permission => permission.id === parentId);
            if (parentPermission) {
                // Check if the parent has a children array, create one if not
                if (!parentPermission.children) {
                    parentPermission.children = [];
                }
                // Push the permission object to the parent's children array
                parentPermission.children.push(permissionObj);
            }
        }

        return permissionObj;
    }
}
