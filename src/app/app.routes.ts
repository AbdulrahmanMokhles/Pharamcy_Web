import { Routes } from '@angular/router';
import { AllProductsComponent } from './Product/Components/all-products/all-products.component';
import { ProductDetailsComponent } from './Product/Components/product-details/product-details.component';
import { StoreComponent } from './Product/Components/store/store.component';
import { EditProductComponent } from './Product/Components/edit-product/edit-product.component';
import { AddProductComponent } from './Product/Components/add-product/add-product.component';

export const routes: Routes = [
    { path: "", redirectTo: "products", pathMatch: "full" },
    { path: "products", component: AllProductsComponent },
    { path: "Add", component: AddProductComponent },
    { path: "Edit", component: EditProductComponent },
    // { path: "Delete/:id", component: AllProductsComponent },
    { path: "details/:id", component: ProductDetailsComponent },
    { path: "store", component: StoreComponent },
];
