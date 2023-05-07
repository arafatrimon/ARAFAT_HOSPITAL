import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { DepartmentModel } from 'src/app/model/department.model';
import { OutdoorPatientModel } from 'src/app/model/outdoor-patient.model';

import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-outdoor-patient',
  templateUrl: './outdoor-patient.component.html',
  styleUrls: ['./outdoor-patient.component.css']
})
export class OutdoorPatientComponent implements OnInit {
    formValue!: FormGroup;
    outdoorPatientModelObj: OutdoorPatientModel = new OutdoorPatientModel();
    outdoorPatientData !: any;
  
    showAdd!:boolean;
    showUpdate!:boolean;


  departments: DepartmentModel[] = [];

  
    constructor(private formBuilder: FormBuilder,
      private api: ApiService) { }
  
    ngOnInit(): void {
      // this.getAllOutdoorPatient();
      // this.getAllDepartment();
  
      this.formValue = this.formBuilder.group({
        patientId: [''],
        name: [''],
        age: [''],
        email: [''],
        mobile: [''],
        address: [''],
        departmentId: [''],
        date: [''],
        problem:[''],
      })
    }
  
    clickAddOutdoorPatient(){
      this.formValue.reset();
      this.showAdd=true;
      this.showUpdate=false;
    }
    getAllDepartment() {
      this.api.get("department")
        .subscribe(res => {
          this.departments = res;
          console.log(this.departments);
          
          //this.outdoorPatientData.image=this.convertToBase64(this.outdoorPatientData.image);
        })
    }



    postOutdoorPatientDetails() {
const obj=this.outdoorPatientModelObj;
const fValue=this.formValue.value;

      obj.patientId = fValue.patientId;
      obj.name = fValue.name;
      obj.age = fValue.age;
      obj.email = fValue.email;
      obj.mobile = fValue.mobile;
      obj.address = fValue.address;
      obj.departmentId = fValue.departmentId;
      obj.date = fValue.date;
      obj.problem = fValue.problem;
      
      
  
      this.api.post(this.outdoorPatientModelObj,"outdoor-patient")
        .subscribe(res => {
          console.log(res);
          alert("OutdoorPatient Adeded Successfully")
          let ref = document.getElementById('cancel')
          ref?.click();
          this.formValue.reset();
          this.getAllOutdoorPatient();
  
        }, _err => {
          alert("Something went worng")
        }
        )
    }
    getAllOutdoorPatient() {
      this.api.get("outdoor-patient")
        .subscribe(res => {
          this.outdoorPatientData = res;
          this.outdoorPatientData.image=this.convertToBase64(this.outdoorPatientData.image);
        })
    }

 

    deleteOutdoorPatient(row: any) {
      this.api.delete(row.id,"outdoor-patient")
        .subscribe((res: any) => {
          alert("OutdoorPatient Deleted")
          this.getAllOutdoorPatient();
        })
    }
    onEdit(row: any) {
  this.showAdd=false;
  this.showUpdate=true;

  
  
      this.outdoorPatientModelObj.id = row.id;
      this.formValue.controls['patientId'].setValue(row.patientId);
      this.formValue.controls['name'].setValue(row.name);
      this.formValue.controls['age'].setValue(row.age);
      this.formValue.controls['email'].setValue(row.email);
      this.formValue.controls['mobile'].setValue(row.mobile);
      this.formValue.controls['address'].setValue(row.address);
      this.formValue.controls['departmentId'].setValue(row.departmentId);
      this.formValue.controls['date'].setValue(row.date);
      this.formValue.controls['gurdianName'].setValue(row.gurdianName);
      this.formValue.controls['guardianPhone'].setValue(row.gurdianPhone);
      
    }
    updateOutdoorPatientDetails() {
      const obj=this.outdoorPatientModelObj;
      const fValue=this.formValue.value;
      
            obj.patientId = fValue.patientId;
            obj.name = fValue.name;
            obj.age = fValue.age;
            obj.email = fValue.email;
            obj.mobile = fValue.mobile;
            obj.address = fValue.address;
            obj.departmentId = fValue.departmentId;
           
      this.api.update(this.outdoorPatientModelObj, this.outdoorPatientModelObj.id,"outdoor-patient")
        .subscribe((res: any)=>{
          alert("Updated Successfully");
          let ref = document.getElementById('cancel')
          ref?.click();
          this.formValue.reset();
          this.getAllOutdoorPatient();
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
      this.getAllOutdoorPatient();
    }
    onTableSizeChange(event:any):void{
      this.tableSize=event.target.value;
      this.page=1;
      this.getAllOutdoorPatient();
    }
  
    }
  
  