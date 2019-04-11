// util imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// angular material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

// service components
import { Add_MoneyService } from './services/Add_Money.service';
import { AdminService } from './services/Admin.service';
import { Checkout_ItemService } from './services/Checkout_Item.service';
import { Create_AssetService } from './services/Create_Asset.service';
import { Delete_AssetService } from './services/Delete_Asset.service';
import { Department_AssetService } from './services/Department_Asset.service';
import { RentalService } from './services/Rental.service';
import { Return_ItemService } from './services/Return_Item.service';
import { StudentService } from './services/Student.service';
import { SystemService } from './services/System.service';
import { WalletService } from './services/Wallet.service';

// network admin page components
import { DropdownBarComponent } from './pages/network-admin-page/dropdown-bar/dropdown-bar.component';
import { AdminPageComponent } from './pages/network-admin-page/admin-page.component';
import { HomeComponent } from './pages/network-admin-page/home/home.component';
import { Department_AssetComponent } from './pages/network-admin-page/Department_Asset/Department_Asset.component';
import { RentalComponent } from './pages/network-admin-page/Rental/Rental.component';
import { AdminComponent } from './pages/network-admin-page/Admin/Admin.component';
import { StudentComponent } from './pages/network-admin-page/Student/Student.component';
import { Create_AssetComponent } from './pages/network-admin-page/Create_Asset/Create_Asset.component';
import { Delete_AssetComponent } from './pages/network-admin-page/Delete_Asset/Delete_Asset.component';
import { Checkout_ItemComponent } from './pages/network-admin-page/Checkout_Item/Checkout_Item.component';
import { Return_ItemComponent } from './pages/network-admin-page/Return_Item/Return_Item.component';
import { Add_MoneyComponent } from './pages/network-admin-page/Add_Money/Add_Money.component';

// shared components
import { SignoutButtonComponent } from './pages/shared/signout-button/signout-button.component';

// launch page components
import { SigninComponent } from './pages/launch-page/signin/signin.component';
import { SignupComponent } from './pages/launch-page/signup/signup.component';

// student page components
import { StudentPageComponent } from './pages/student-page/student-page/student-page.component';
import { StudentInfoTabComponent } from './pages/student-page/student-page/info-tab/info-tab.component';
import { StudentAvailableTabComponent } from './pages/student-page/student-page/available-tab/available-tab.component';
import { StudentRentalTabComponent } from './pages/student-page/student-page/rental-tab/rental-tab.component';

// department page components
import { DeptAdminPageComponent } from './pages/dept-admin-page/department-admin-page/department-admin-page.component';
import { DeptAdminInfoTabComponent } from './pages/dept-admin-page/department-admin-page/info-tab/info-tab.component';
import { DeptAdminRentalsTabComponent } from './pages/dept-admin-page/department-admin-page/rentals-tab/rentals-tab.component';
import { DeptAdminCreateTabComponent } from './pages/dept-admin-page/department-admin-page/create-tab/create-tab.component';
import { DeptAdminCheckinTabComponent } from './pages/dept-admin-page/department-admin-page/checkin-tab/checkin-tab.component';
import { DeptAdminCheckoutTabComponent } from './pages/dept-admin-page/department-admin-page/checkout-tab/checkout-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    Department_AssetComponent,
    RentalComponent,
    AdminComponent,
    StudentComponent,
    Create_AssetComponent,
    Delete_AssetComponent,
    Checkout_ItemComponent,
    Return_ItemComponent,
    Add_MoneyComponent,
    SigninComponent,
    SignupComponent,
    DropdownBarComponent,
    AdminPageComponent,
    HomeComponent,
    StudentPageComponent,
    StudentAvailableTabComponent,
    StudentRentalTabComponent,
    StudentInfoTabComponent,
    DeptAdminPageComponent,
    DeptAdminInfoTabComponent,
    DeptAdminCreateTabComponent,
    DeptAdminCheckinTabComponent,
    DeptAdminCheckoutTabComponent,
    DeptAdminRentalsTabComponent,
    SignoutButtonComponent,
    StudentInfoTabComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    DataService,
    Add_MoneyService,
    AdminService,
    Checkout_ItemService,
    Create_AssetService,
    Delete_AssetService,
    Department_AssetService,
    RentalService,
    Return_ItemService,
    StudentService,
    AdminService,
    SystemService,
    WalletService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
