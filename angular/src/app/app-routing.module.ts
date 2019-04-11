
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// admin page components
import { HomeComponent } from './pages/network-admin-page/home/home.component';
import { AdminPageComponent } from './pages/network-admin-page/admin-page.component';
import { Department_AssetComponent } from './pages/network-admin-page/Department_Asset/Department_Asset.component';
import { RentalComponent } from './pages/network-admin-page/Rental/Rental.component';
import { AdminComponent } from './pages/network-admin-page/Admin/Admin.component';
import { StudentComponent } from './pages/network-admin-page/Student/Student.component';
import { Create_AssetComponent } from './pages/network-admin-page/Create_Asset/Create_Asset.component';
import { Delete_AssetComponent } from './pages/network-admin-page/Delete_Asset/Delete_Asset.component';
import { Checkout_ItemComponent } from './pages/network-admin-page/Checkout_Item/Checkout_Item.component';
import { Return_ItemComponent } from './pages/network-admin-page/Return_Item/Return_Item.component';
import { Add_MoneyComponent } from './pages/network-admin-page/Add_Money/Add_Money.component';

// launch pages
import { SigninComponent } from './pages/launch-page/signin/signin.component';
import { SignupComponent } from './pages/launch-page/signup/signup.component';
import { DeptAdminPageComponent } from './pages/dept-admin-page/department-admin-page/department-admin-page.component';
import { StudentPageComponent } from './pages/student-page/student-page/student-page.component';

const routes: Routes = [
  { path: 'admin', component: AdminPageComponent, children: [
    { path: 'Home', component: HomeComponent },
    { path: 'Department_Asset', component: Department_AssetComponent },
    { path: 'Rental', component: RentalComponent },
    { path: 'Admin', component: AdminComponent },
    { path: 'Student', component: StudentComponent },
    { path: 'Create_Asset', component: Create_AssetComponent },
    { path: 'Delete_Asset', component: Delete_AssetComponent },
    { path: 'Checkout_Item', component: Checkout_ItemComponent },
    { path: 'Return_Item', component: Return_ItemComponent },
    { path: 'Add_Money', component: Add_MoneyComponent }
  ]},
  { path: 'departmentadmin', component: DeptAdminPageComponent },
  { path: 'student', component: StudentPageComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  
  { path: '**', redirectTo: 'signin' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
