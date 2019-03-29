// util imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';

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

// admin page components
import { DropdownBarComponent } from './pages/admin-page/dropdown-bar/dropdown-bar.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { HomeComponent } from './pages/admin-page/home/home.component';
import { Department_AssetComponent } from './pages/admin-page/Department_Asset/Department_Asset.component';
import { RentalComponent } from './pages/admin-page/Rental/Rental.component';
import { AdminComponent } from './pages/admin-page/Admin/Admin.component';
import { StudentComponent } from './pages/admin-page/Student/Student.component';
import { Create_AssetComponent } from './pages/admin-page/Create_Asset/Create_Asset.component';
import { Delete_AssetComponent } from './pages/admin-page/Delete_Asset/Delete_Asset.component';
import { Checkout_ItemComponent } from './pages/admin-page/Checkout_Item/Checkout_Item.component';
import { Return_ItemComponent } from './pages/admin-page/Return_Item/Return_Item.component';
import { Add_MoneyComponent } from './pages/admin-page/Add_Money/Add_Money.component';

// launch page components
import { SigninComponent } from './pages/launch-page/signin/signin.component';
import { SignupComponent } from './pages/launch-page/signup/signup.component';
import { StudentPageComponent } from './pages/student-page/student-page/student-page.component';
import { DepartmentAdminPageComponent } from './pages/dept-admin-page/department-admin-page/department-admin-page.component';
import { CreateTabComponent } from './pages/dept-admin-page/department-admin-page/create-tab/create-tab.component';
import { SignoutButtonComponent } from './pages/components/signout-button/signout-button.component';
import { CheckoutTabComponent } from './pages/student-page/student-page/checkout-tab/checkout-tab.component';
import { StudentViewTabComponent } from './pages/student-page/student-page/view-tab/view-tab.component';
import { DeptAdminViewTabComponent } from './pages/dept-admin-page/department-admin-page/view-tab/view-tab.component';
import { DepartmentAdminHomeTabComponent } from './pages/dept-admin-page/department-admin-page/home-tab/home-tab.component';
import { StudentHomeTabComponent } from './pages/student-page/student-page/home-tab/home-tab.component';
import { CheckinTabComponent } from './pages/dept-admin-page/department-admin-page/checkin-tab/checkin-tab.component';

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
    DepartmentAdminPageComponent,
    DeptAdminViewTabComponent,
    StudentViewTabComponent,
    CreateTabComponent,
    SignoutButtonComponent,
    CheckoutTabComponent,
    StudentViewTabComponent,
    DeptAdminViewTabComponent,
    DepartmentAdminHomeTabComponent,
    StudentHomeTabComponent,
    CheckinTabComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
