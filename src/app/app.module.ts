import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { ProductComponent } from './components/product/product.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { AuthService } from './services/auth.service';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AdminErrorComponent } from './components/admin-error/admin-error.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { CartService } from './services/cart.service';
import { QuantitySelectorComponent } from './components/quantity-selector/quantity-selector.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderService } from './services/order.service';
import { ThankYouComponent } from './components/thank-you/thank-you.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    ProductComponent,
    FooterComponent,
    ContactComponent,
    LoginComponent,
    ShopComponent,
    RegisterComponent,
    CartComponent,
    MyOrdersComponent,
    ManageProductsComponent,
    ManageUsersComponent,
    AdminErrorComponent,
    ProductFormComponent,
    ProductBoxComponent,
    QuantitySelectorComponent,
    CheckoutComponent,
    PaymentComponent,
    ThankYouComponent
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      }, {
        path: 'thank-you',
        component: ThankYouComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'shop',
        component: ShopComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'admin-error',
        component: AdminErrorComponent

      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
       {
        path: 'product-form/:id',
        component: ProductFormComponent,
        canActivate : [AuthGuardService,AdminAuthGuardService]
      },
      {
        path: 'product-form',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]

      },

      {
        path: 'my-orders',
        component: MyOrdersComponent,
        canActivate : [AuthGuardService]
      },
      {
        path: 'manage-products',
        component: ManageProductsComponent,
        canActivate : [AuthGuardService,AdminAuthGuardService]
      },
      {
        path: 'manage-products/:id',
        component: ManageProductsComponent,
        canActivate : [AuthGuardService,AdminAuthGuardService]
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent,
        canActivate : [AuthGuardService,AdminAuthGuardService]
      },
      {
        path: 'manage-users/:id',
        component: ManageUsersComponent,
        canActivate : [AuthGuardService,AdminAuthGuardService]
      },
      {
        path: 'checkout',
        component:CheckoutComponent,
        canActivate : [AuthGuardService]
      },
      {
        path: 'payment',
        component: PaymentComponent,
        canActivate : [AuthGuardService]
      }
    ])
  ],
  providers: [
    UserService,
    ProductService,
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    CartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
