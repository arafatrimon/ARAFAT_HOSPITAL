import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { AppointmentModel } from '../model/appointment.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formValue!: FormGroup;
  appointmentModelObj: AppointmentModel = new AppointmentModel();
  appointmentData !: any;
  doctorData!:any;
  departmentData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;

  checked!: boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllAppointment();
this.getAllDoctor();
this.getAllDepartment();
    this.formValue = this.formBuilder.group({
      patientId: [''],
      patientName: [''],
      departmentId: [''],
      doctorId: [''],
      appointmentDate:null,
      serialNo: [''],
      problem: [''],
      status:false,
    })
  }

  clickAddAppointment(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postAppointmentDetails() {
    this.appointmentModelObj.patientId = this.formValue.value.patientId;
    this.appointmentModelObj.patientName = this.formValue.value.patientName;
    this.appointmentModelObj.department = {"id":this.formValue.value.departmentId};
    this.appointmentModelObj.doctor = {"id":this.formValue.value.doctorId};
    this.appointmentModelObj.appointmentDate = this.formValue.value.appointmentDate;
    this.appointmentModelObj.serialNo = this.formValue.value.serialNo;
    this.appointmentModelObj.problem = this.formValue.value.problem;
    this.appointmentModelObj.status = this.formValue.value.status;


    console.log("appointment"+this.appointmentModelObj);
    
  
    this.api.post(this.appointmentModelObj,"appointment")
      .subscribe(res => {
        console.log(res);
        alert("Appointment Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllAppointment();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllAppointment() {
    this.api.get("appointment")
      .subscribe(res => {
        this.appointmentData = res;
        //this.appointmentData.image=this.convertToBase64(this.appointmentData.image);
        console.log(this.appointmentData);
        
      })
  }

  getAllDoctor() {
    this.api.get("doctor")
      .subscribe(res => {
        this.doctorData = res;
        //this.doctorData.image=this.convertToBase64(this.doctorData.image);
        //console.log(this.doctorData);
        
      })
  }


  getAllDepartment() {
    this.api.get("department")
      .subscribe(res => {
        this.departmentData = res;
        console.log(this.departmentData);
        
        //this.doctorData.image=this.convertToBase64(this.doctorData.image);
        //console.log(this.doctorData);
        
      })
  }
  
  deleteAppointment(row: any) {
    this.api.delete(row.id,"appointment")
      .subscribe((res: any) => {
        alert("Appointment Deleted")
        this.getAllAppointment();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.appointmentModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateAppointmentDetails() {

    // this.appointmentModelObj.firstName = this.formValue.value.firstName;
    // this.appointmentModelObj.lastName = this.formValue.value.lastName;
    // this.appointmentModelObj.email = this.formValue.value.email;
    // this.appointmentModelObj.mobile = this.formValue.value.mobile;
    // this.appointmentModelObj.salary = this.formValue.value.salary;
    
    // this.appointmentModelObj.image=this.base64code;

    // this.api.update(this.appointmentModelObj, this.appointmentModelObj.id,"appointment")
    //   .subscribe((res: any)=>{
    //     alert("Updated Successfully");
    //     let ref = document.getElementById('cancel')
    //     ref?.click();
    //     this.formValue.reset();
    //     this.getAllAppointment();
    //   })

    }


    onDetails(row:any) {
      
      this.onEdit(row);
      this.showAdd=false;
      this.showUpdate=false;
  }
  
  searchText='';

//convert image base 64 format


myimage!: Observable<any>;
  base64code!: any
 
  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBase64(file)
  };
 
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
 
    observable.subscribe((d) => {
      console.log(d)
      this.myimage = d
      this.base64code = d
    })
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
 
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  //pagination

  POSTS:any;
  page:number=1;
  count:number=0;
  tableSize:number=5;
  tableSizes:any=[5,10,15,20];

  onTableDataChange(event:any){
    this.page=event;
    this.getAllAppointment();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllAppointment();
  }


  statusVal:any=false

checkValue(event:any,id:any){

  if (event.target.checked){
  this.statusVal=true
  }else{
    this.statusVal=false
  }
  this.api.statusUpdate(this.statusVal,id,"appointment")
  .subscribe((res: any) => {
    //this.getTrueStatus();
    alert("Appointment Updated")
  })
  
}

  }

