export interface MenuItem {
  category: string;
  itemName: string;
  regularPrice: string;
  imageUrl: string;
}

export interface MenuItemsByCategory {
  [category: string]: MenuItem[];
}
