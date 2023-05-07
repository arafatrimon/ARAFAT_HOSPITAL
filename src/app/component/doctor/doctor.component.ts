import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { DoctorModel } from 'src/app/model/doctor.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  formValue!: FormGroup;
  doctorModelObj: DoctorModel = new DoctorModel();
  doctorData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllDoctor();

    this.formValue = this.formBuilder.group({
      doctorId: [''],
      name: [''],
      department: [''],
      email: [''],
      mobile: [''],
      age: [''],
      address: [''],
      specializedIn: [''],
      qualification: [''],
      joiningDate: [''],
      leavingDate: [''],
      visit: [''],

      image:[]
    })
  }

  clickAddDoctor(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postDoctorDetails() {
    this.doctorModelObj.doctorId = this.formValue.value.doctorId;
    this.doctorModelObj.name = this.formValue.value.name;
    this.doctorModelObj.department = this.formValue.value.department;
    this.doctorModelObj.email = this.formValue.value.email;
    this.doctorModelObj.mobile = this.formValue.value.mobile;
    this.doctorModelObj.age = this.formValue.value.age;
    this.doctorModelObj.address = this.formValue.value.address;
    this.doctorModelObj.specializedIn = this.formValue.value.specializedIn;
    this.doctorModelObj.qualification = this.formValue.value.qualification;
    this.doctorModelObj.joiningDate = this.formValue.value.joiningDate;
    this.doctorModelObj.leavingDate = this.formValue.value.leavingDate;
    this.doctorModelObj.visit = this.formValue.value.visit;

    this.doctorModelObj.image=this.base64code;

    this.api.post(this.doctorModelObj,"doctor")
      .subscribe(res => {
        console.log(res);
        alert("Doctor Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllDoctor();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllDoctor() {
    this.api.get("doctor")
      .subscribe(res => {
        this.doctorData = res;
        this.doctorData.image=this.convertToBase64(this.doctorData.image);
      })
  }
  deleteDoctor(row: any) {
    this.api.delete(row.id,"doctor")
      .subscribe((res: any) => {
        alert("Doctor Deleted")
        this.getAllDoctor();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.doctorModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateDoctorDetails() {

    // this.doctorModelObj.firstName = this.formValue.value.firstName;
    // this.doctorModelObj.lastName = this.formValue.value.lastName;
    // this.doctorModelObj.email = this.formValue.value.email;
    // this.doctorModelObj.mobile = this.formValue.value.mobile;
    // this.doctorModelObj.salary = this.formValue.value.salary;
    
    // this.doctorModelObj.image=this.base64code;

    this.api.update(this.doctorModelObj, this.doctorModelObj.id,"doctor")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllDoctor();
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
    this.getAllDoctor();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllDoctor();
  }

  }

