import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientComponent } from './component/patient/patient.component';
import { SearchPipe } from './search.pipe';
import { OutdoorPatientComponent } from './component/outdoor-patient/outdoor-patient.component';
import { DoctorComponent } from './component/doctor/doctor.component';
import { ScheduleComponent } from './component/schedule/schedule.component';
import { AppointmentComponent } from './component/appointment/appointment.component';
import { PrescriptionComponent } from './component/prescription/prescription.component';
import { BedDetailsComponent } from './component/bed-details/bed-details.component';
import { MessageComponent } from './component/message/message.component';
import { MailComponent } from './component/mail/mail.component';
import { AmbulanceComponent } from './component/ambulance/ambulance.component';
import { LabManagementComponent } from './component/lab-management/lab-management.component';
import { ReportsComponent } from './component/reports/reports.component';
import { NoticeBoardComponent } from './component/notice-board/notice-board.component';
import { OperationReportComponent } from './component/operation-report/operation-report.component';
import { HumanResourceComponent } from './component/human-resource/human-resource.component';
import { InvestigatioinComponent } from './component/investigatioin/investigatioin.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { AccountComponent } from './component/account/account.component';
import { PaymentComponent } from './component/payment/payment.component';
import { BirthReportComponent } from './component/birth-report/birth-report.component';
import { DeathReportComponent } from './component/death-report/death-report.component';
import { MedicineComponent } from './component/medicine/medicine.component';
import { SmsComponent } from './component/sms/sms.component';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { SumPipeModule } from './pipe/sum.pipe';
import { MedicineCategoryComponent } from './component/medicine-category/medicine-category.component';
import { PayrollComponent } from './component/payroll/payroll.component';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { HumanResourceCategoryComponent } from './component/human-resource-category/human-resource-category.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AnbulanceExpendatureComponent } from './component/anbulance-expendature/anbulance-expendature.component';
import { AmbulanceHireComponent } from './component/ambulance-hire/ambulance-hire.component';
import { AmbulanceBookUnbookComponent } from './component/ambulance-book-unbook/ambulance-book-unbook.component';
import { BloodBankRequestComponent } from './component/blood-bank-request/blood-bank-request.component';
import { BloodBankSupplyComponent } from './component/blood-bank-supply/blood-bank-supply.component';
import { BloodBankReportComponent } from './component/blood-bank-report/blood-bank-report.component';
import { DepartmentComponent } from './component/department/department.component';
import { BloodDonorComponent } from './component/blood-donor/blood-donor.component';
import { PatientDischargeComponent } from './component/patient-discharge/patient-discharge.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { TestDetailsComponent } from './component/test-details/test-details.component';
import { InvoiceMedicineComponent } from './component/invoice-medicine/invoice-medicine.component';
import { HomeComponent } from './home/home.component';
import { DiagnosticBillCollectionComponent } from './component/diagnostic-bill-collection/diagnostic-bill-collection.component';
import { PatientBillCollectionComponent } from './component/patient-bill-collection/patient-bill-collection.component';
import { PatientAppointmentComponent } from './component/patient-appointment/patient-appointment.component';

import { DashFirstComponent } from './dash-first/dash-first.component';


@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    SearchPipe,
    OutdoorPatientComponent,
    DoctorComponent,
    ScheduleComponent,
    AppointmentComponent,
    PrescriptionComponent,
    BedDetailsComponent,
    MessageComponent,
    MailComponent,
    AmbulanceComponent,
  
    LabManagementComponent,
    ReportsComponent,
    NoticeBoardComponent,
    OperationReportComponent,
    HumanResourceComponent,
    InvestigatioinComponent,
    InvoiceComponent,
    AccountComponent,
    PaymentComponent,
    BirthReportComponent,
    DeathReportComponent,
    MedicineComponent,
    SmsComponent,
    MedicineCategoryComponent,
    PayrollComponent,
    AttendanceComponent,
    HumanResourceCategoryComponent,
 
    AnbulanceExpendatureComponent,
    AmbulanceHireComponent,
    AmbulanceBookUnbookComponent,
    BloodBankRequestComponent,
    BloodBankSupplyComponent,
    BloodBankReportComponent,
    DepartmentComponent,
    BloodDonorComponent,
    PatientDischargeComponent,
    
    SignupComponent,
    DashboardComponent,
    LoginComponent,
    TestDetailsComponent,
    InvoiceMedicineComponent,
    HomeComponent,
    DiagnosticBillCollectionComponent,
    PatientBillCollectionComponent,
    PatientAppointmentComponent,
    
    DashFirstComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    SumPipeModule,
    NgxPaginationModule

  ],
  providers: [SumPipeModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
