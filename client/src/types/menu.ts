export interface MenuItem {
  id: number;
  categoryId: number;
  name: string;
  price: string;
  imageUrl: string;
}

export interface MenuCategory {
  id: number;
  name: string;
  items: MenuItem[];
}

export interface MenuResponse {
  categories: MenuCategory[];
}
