export enum ValueTypeEnum {
  PERCENTAGE = 'PERCENTAGE',
  AMOUNT = 'AMOUNT',
}

export enum DiscountRequirementEnum {
  MIN_PRODUCT_QTY = 'MIN_PRODUCT_QTY',
  MIN_PURCHASE_PRICE = 'MIN_PURCHASE_PRICE',
}

export enum DiscountTypeEnum {
  PROMOTIONAL = 'PROMOTIONAL',
  // REWARD = 'REWARD', not still using 
}

export enum ShowOnlyEnum {
  GUEST_CUSTOMERS = 'GUEST_CUSTOMERS',
  LOGGED_CUSTOMERS = 'LOGGED_CUSTOMERS',
  ALL = 'ALL',
  NONE = 'NONE',
}

export enum TimeLineEnum {
  ONE_TIME = 'ONE_TIME',
  MULTIPLE = 'MULTIPLE',
}
