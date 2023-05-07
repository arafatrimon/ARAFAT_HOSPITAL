import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { PatientDischargeModel } from 'src/app/model/patient-discharge.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-patient-discharge',
  templateUrl: './patient-discharge.component.html',
  styleUrls: ['./patient-discharge.component.css']
})
export class PatientDischargeComponent implements OnInit {

  formValue!: FormGroup;
  patientDischargeModelObj: PatientDischargeModel = new PatientDischargeModel();
  patientDischargeData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllPatientDischarge();

    this.formValue = this.formBuilder.group({
      patientId: [''],
      patientName: [''],
      email: [''],
      mobile: [''],
      disease: [''],
      consultantName: [''],
      admitionDate: [''],
      leavingDate: [''],
      totalCost: [''],

    })
  }

  clickAddPatientDischarge(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postPatientDischargeDetails() {
    this.patientDischargeModelObj.patientId = this.formValue.value.patientId;
    this.patientDischargeModelObj.patientName = this.formValue.value.patientName;
    this.patientDischargeModelObj.email = this.formValue.value.email;
    this.patientDischargeModelObj.mobile = this.formValue.value.mobile;
    this.patientDischargeModelObj.disease = this.formValue.value.disease;
    this.patientDischargeModelObj.consultantName = this.formValue.value.consultantName;
    this.patientDischargeModelObj.admitionDate = this.formValue.value.admitionDate;
    this.patientDischargeModelObj.leavingDate = this.formValue.value.leavingDate;
    this.patientDischargeModelObj.totalCost = this.formValue.value.totalCost;
   

    this.api.post(this.patientDischargeModelObj,"patient-discharge")
      .subscribe(res => {
        console.log(res);
        alert("PatientDischarge Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllPatientDischarge();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllPatientDischarge() {
    this.api.get("patient-discharge")
      .subscribe(res => {
        this.patientDischargeData = res;
        this.patientDischargeData.image=this.convertToBase64(this.patientDischargeData.image);
      })
  }
  deletePatientDischarge(row: any) {
    this.api.delete(row.id,"patient-discharge")
      .subscribe((res: any) => {
        alert("PatientDischarge Deleted")
        this.getAllPatientDischarge();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.patientDischargeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updatePatientDischargeDetails() {

    // this.patientDischargeModelObj.firstName = this.formValue.value.firstName;
    // this.patientDischargeModelObj.lastName = this.formValue.value.lastName;
    // this.patientDischargeModelObj.email = this.formValue.value.email;
    // this.patientDischargeModelObj.mobile = this.formValue.value.mobile;
    // this.patientDischargeModelObj.salary = this.formValue.value.salary;
    
    // this.patientDischargeModelObj.image=this.base64code;

    this.api.update(this.patientDischargeModelObj, this.patientDischargeModelObj.id,"patient-discharge")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllPatientDischarge();
      })

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
  tableSize:number=10;
  tableSizes:any=[5,10,15,20];

  onTableDataChange(event:any){
    this.page=event;
    this.getAllPatientDischarge();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllPatientDischarge();
  }

  }

