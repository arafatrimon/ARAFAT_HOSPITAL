import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './component/account/account.component';
import { AmbulanceComponent } from './component/ambulance/ambulance.component';
import { AppointmentComponent } from './component/appointment/appointment.component';
import { BedDetailsComponent } from './component/bed-details/bed-details.component';
import { BirthReportComponent } from './component/birth-report/birth-report.component';
import { DeathReportComponent } from './component/death-report/death-report.component';
import { DepartmentComponent } from './component/department/department.component';
import { DoctorComponent } from './component/doctor/doctor.component';
import { HumanResourceComponent } from './component/human-resource/human-resource.component';
import { InvestigatioinComponent } from './component/investigatioin/investigatioin.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { LabManagementComponent } from './component/lab-management/lab-management.component';
import { MailComponent } from './component/mail/mail.component';
import { MedicineComponent } from './component/medicine/medicine.component';
import { MessageComponent } from './component/message/message.component';
import { NoticeBoardComponent } from './component/notice-board/notice-board.component';
import { OperationReportComponent } from './component/operation-report/operation-report.component';
import { OutdoorPatientComponent } from './component/outdoor-patient/outdoor-patient.component';
import { PatientComponent } from './component/patient/patient.component';
import { PaymentComponent } from './component/payment/payment.component';
import { PrescriptionComponent } from './component/prescription/prescription.component';
import { ReportsComponent } from './component/reports/reports.component';
import { ScheduleComponent } from './component/schedule/schedule.component';
import { SignupComponent } from './signup/signup.component';
import { SmsComponent } from './component/sms/sms.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BloodBankReportComponent } from './component/blood-bank-report/blood-bank-report.component';
import { AmbulanceExpendatureModel } from './model/ambulance-expendature.model';
import { AmbulanceHireComponent } from './component/ambulance-hire/ambulance-hire.component';
import { AnbulanceExpendatureComponent } from './component/anbulance-expendature/anbulance-expendature.component';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { BloodBankRequestComponent } from './component/blood-bank-request/blood-bank-request.component';
import { BloodBankSupplyComponent } from './component/blood-bank-supply/blood-bank-supply.component';
import { BloodDonorComponent } from './component/blood-donor/blood-donor.component';
import { HumanResourceCategoryComponent } from './component/human-resource-category/human-resource-category.component';
import { MedicineCategoryComponent } from './component/medicine-category/medicine-category.component';
import { PatientDischargeComponent } from './component/patient-discharge/patient-discharge.component';
import { TestDetailsComponent } from './component/test-details/test-details.component';
import { InvoiceMedicineComponent } from './component/invoice-medicine/invoice-medicine.component';
import { HomeComponent } from './home/home.component';
import { PatientBillCollectionComponent } from './component/patient-bill-collection/patient-bill-collection.component';
import { PatientAppointmentComponent } from './component/patient-appointment/patient-appointment.component';
import { DashFirstComponent } from './dash-first/dash-first.component';
//import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
{path:"",component:HomeComponent},
{path:"login",component:LoginComponent},
{path:"signup",component:SignupComponent},
{path:"dashboard",component:DashboardComponent,
children:[
  {path:'',component:DashFirstComponent},
  {path:"account",component:AccountComponent},
 {path:"ambulance",component:AmbulanceComponent},
 {path:"ambulance-hire",component:AmbulanceHireComponent},
 {path:"ambulance-expendature",component:AnbulanceExpendatureComponent},
 {path:"ambulance",component:AmbulanceComponent},
 {path:"appointment",component:AppointmentComponent},
 {path:"attendance",component:AttendanceComponent},
 {path:"bed-details",component:BedDetailsComponent},
 {path:"birth-report",component:BirthReportComponent},
 {path:"blood-bank-report",component:BloodBankReportComponent},
 {path:"blood-bank-request",component:BloodBankRequestComponent},
 {path:"blood-bank-supply",component:BloodBankSupplyComponent},
 {path:"blood-donor",component:BloodDonorComponent},

 {path:"death-report",component:DeathReportComponent},
 {path:"doctor",component:DoctorComponent},
 {path:"human-resource",component:HumanResourceComponent},
 {path:"human-resource-category",component:HumanResourceCategoryComponent},
 {path:"investigation",component:InvestigatioinComponent},
 {path:"invoice",component:InvoiceComponent},
 {path:"lab-management",component:LabManagementComponent},
 {path:"mail",component:MailComponent},
 {path:"medicine",component:MedicineComponent},
 {path:"medicine-category",component:MedicineCategoryComponent},
 {path:"message",component:MessageComponent},
 {path:"notice-board",component:NoticeBoardComponent},
 {path:"operation-report",component:OperationReportComponent},
 {path:"outdoor-patient",component:OutdoorPatientComponent},
 {path:"indoor-patient",component:PatientComponent},
 {path:"patient-discharge",component:PatientDischargeComponent},
 {path:"patient-bill-collection",component:PatientBillCollectionComponent},
{path:"patient-appointment",component:PatientAppointmentComponent},
 {path:"payment",component:PaymentComponent},
 {path:"invoice",component:InvoiceComponent},
 {path:"prescription",component:PrescriptionComponent},
 {path:"reports",component:ReportsComponent},
 {path:"schedule",component:ScheduleComponent},
 {path:"sms",component:SmsComponent},
 {path:"department",component:DepartmentComponent},
 {path:"test-details",component:TestDetailsComponent},
 {path:"invoice-medicine",component:InvoiceMedicineComponent},

]}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
