import { Routes } from '@angular/router';
import { AllProductsComponent } from './Product/Components/all-products/all-products.component';
import { ProductDetailsComponent } from './Product/Components/product-details/product-details.component';
import { StoreComponent } from './Product/Components/store/store.component';
import { AddProductComponent } from './Product/Components/add-product/add-product.component';
import { LoginComponent } from './User/login/login.component';
import { SignUpComponent } from './User/sign-up/sign-up.component';
import { HomeComponent } from './Home/home/home.component';
import { AboutComponent } from './Home/about/about.component';
import { Cart2Component } from './User/cart2/cart2.component';
import { ProfileComponent } from './User/Profile/Components/profile/profile.component';
import { OrdersTableComponent } from './Orders/Components/orders-table/orders-table.component';
import { EditComponent } from './User/Profile/Components/edit/edit.component';
import { AddOrderComponent } from './User/checkout/components/add-order/add-order.component';
import { ThankyouComponent } from './User/thankyou/components/thankyou/thankyou.component';
import { ErrorComponent } from './Shared/Components/error/error.component';
import { ContactusComponent } from './Shared/Components/contactus/contactus.component';
import { ThankComponent } from './User/thankyou/components/thank/thank.component';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "about", component: AboutComponent },
    { path: "products", component: AllProductsComponent },
    { path: "Add", component: AddProductComponent },
    { path: "details/:id", component: ProductDetailsComponent },
    { path: "store", component: StoreComponent },
    { path: "Login", component: LoginComponent },
    { path: "SignUp", component: SignUpComponent },
    { path: "Cart2", component: Cart2Component },
    { path: "profile", component: ProfileComponent },
    { path: "orders", component: OrdersTableComponent },
    { path: "edit", component: EditComponent },
    { path: "checkout", component: AddOrderComponent },
    { path: "thankyou", component: ThankComponent },
    { path: "contact", component: ContactusComponent },
    { path: "**", component: ErrorComponent },
];
