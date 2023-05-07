import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { PrescriptionModel } from 'src/app/model/prescription.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  formValue!: FormGroup;
  prescriptionModelObj: PrescriptionModel = new PrescriptionModel();
  prescriptionData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllPrescription();

    this.formValue = this.formBuilder.group({
      patientId: [''],
      name: [''],
      age: [''],
      gender: [''],
      address: [''],
      mobile: [''],
      medicine: [''],
      test: [''],
      fee: [''],
      notes: [''],

    })
  }

  clickAddPrescription(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postPrescriptionDetails() {
    this.prescriptionModelObj.patientId = this.formValue.value.patientId;
    this.prescriptionModelObj.name = this.formValue.value.name;
    this.prescriptionModelObj.age = this.formValue.value.age;
    this.prescriptionModelObj.gender = this.formValue.value.gender;
    this.prescriptionModelObj.address = this.formValue.value.address;
    this.prescriptionModelObj.mobile = this.formValue.value.mobile;
    this.prescriptionModelObj.medicine = this.formValue.value.medicine;
    this.prescriptionModelObj.test = this.formValue.value.test;
    this.prescriptionModelObj.fee = this.formValue.value.fee;
    this.prescriptionModelObj.notes = this.formValue.value.notes;


    this.api.post(this.prescriptionModelObj,"prescription")
      .subscribe(res => {
        console.log(res);
        alert("Prescription Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllPrescription();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllPrescription() {
    this.api.get("prescription")
      .subscribe(res => {
        this.prescriptionData = res;
        this.prescriptionData.image=this.convertToBase64(this.prescriptionData.image);
      })
  }
  deletePrescription(row: any) {
    this.api.delete(row.id,"prescription")
      .subscribe((res: any) => {
        alert("Prescription Deleted")
        this.getAllPrescription();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.prescriptionModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updatePrescriptionDetails() {

    // this.prescriptionModelObj.firstName = this.formValue.value.firstName;
    // this.prescriptionModelObj.lastName = this.formValue.value.lastName;
    // this.prescriptionModelObj.email = this.formValue.value.email;
    // this.prescriptionModelObj.mobile = this.formValue.value.mobile;
    // this.prescriptionModelObj.salary = this.formValue.value.salary;
    
    // this.prescriptionModelObj.image=this.base64code;

    this.api.update(this.prescriptionModelObj, this.prescriptionModelObj.id,"prescription")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllPrescription();
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
    this.getAllPrescription();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllPrescription();
  }

  }

