export const PermissionsHierarchyObj = {
  CATEGORY: {
    PARENT: {
      PERMISSION_NAME: 'CATEGORY',
      DESCRIPTION: 'Category',
    },
    CHILDREN: {
      VIEW_CATEGORY: {
        PERMISSION_NAME: 'VIEW_CATEGORY',
        DESCRIPTION: 'View Information ',
      },
      CREATE_CATEGORY: {
        PERMISSION_NAME: 'CREATE_CATEGORY',
        DESCRIPTION: 'Create',
      },
      UPDATE_CATEGORY: {
        PERMISSION_NAME: 'UPDATE_CATEGORY',
        DESCRIPTION: 'Update',
      },
      DELETE_CATEGORY: {
        PERMISSION_NAME: 'DELETE_CATEGORY',
        DESCRIPTION: 'Delete',
      },
    },
  },

  STAFF: {
    PARENT: {
      PERMISSION_NAME: 'STAFF',
      DESCRIPTION: 'Staff',
    },
    CHILDREN: {
      VIEW_STAFF: {
        PERMISSION_NAME: 'VIEW_STAFF',
        DESCRIPTION: 'View Infomation',
      },
      CREATE_STAFF: {
        PERMISSION_NAME: 'CREATE_STAFF',
        DESCRIPTION: 'Create',
      },
      UPDATE_STAFF: {
        PERMISSION_NAME: 'UPDATE_STAFF',
        DESCRIPTION: 'Update',
      },
      DELETE_STAFF: {
        PERMISSION_NAME: 'DELETE_STAFF',
        DESCRIPTION: 'Delete',
      },
    },
  },

  CUSTOMER: {
    PARENT: {
      PERMISSION_NAME: 'CUSTOMER',
      DESCRIPTION: 'Customer',
    },
    CHILDREN: {
      VIEW_DASHBOARD: {
        PERMISSION_NAME: 'VIEW_CUSTOMER',
        DESCRIPTION: 'View Infomation',
      },
    },
  },
  PRODUCT: {
    PARENT: {
      PERMISSION_NAME: 'PRODUCT',
      DESCRIPTION: 'Product',
    },
    CHILDREN: {
      CREATE_PRODUCT: {
        PERMISSION_NAME: 'CREATE_PRODUCT',
        DESCRIPTION: 'Create',
      },
      UPDATE_PRODUCT: {
        PERMISSION_NAME: 'UPDATE_PRODUCT',
        DESCRIPTION: 'Update',
      },
      DELETE_PRODUCT: {
        PERMISSION_NAME: 'DELETE_PRODUCT',
        DESCRIPTION: 'Delete ',
      },
      VIEW_PRODUCT: {
        PERMISSION_NAME: 'VIEW_PRODUCT',
        DESCRIPTION: 'View',
      },
    },
  },
};
