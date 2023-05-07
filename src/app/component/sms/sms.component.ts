import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { SmsModel } from 'src/app/model/sms.model';

import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {

  formValue!: FormGroup;
  sMSModelObj: SmsModel = new SmsModel();
  sMSData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllSMS();

    this.formValue = this.formBuilder.group({
      mobile: [''],
      message: ['']
    })
  }

  clickAddSMS(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postSMSDetails() {
    this.sMSModelObj.mobile = this.formValue.value.mobile;
    this.sMSModelObj.message = this.formValue.value.message;
    this.api.post(this.sMSModelObj,"sms")
      .subscribe(res => {
        console.log(res);
        alert("SMS Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllSMS();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllSMS() {
    this.api.get("sms")
      .subscribe(res => {
        this.sMSData = res;
        this.sMSData.image=this.convertToBase64(this.sMSData.image);
      })
  }
  deleteSMS(row: any) {
    this.api.delete(row.id,"sms")
      .subscribe((res: any) => {
        alert("SMS Deleted")
        this.getAllSMS();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.sMSModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateSMSDetails() {

    // this.sMSModelObj.firstName = this.formValue.value.firstName;
    // this.sMSModelObj.lastName = this.formValue.value.lastName;
    // this.sMSModelObj.email = this.formValue.value.email;
    // this.sMSModelObj.mobile = this.formValue.value.mobile;
    // this.sMSModelObj.salary = this.formValue.value.salary;
    
    // this.sMSModelObj.image=this.base64code;

    this.api.update(this.sMSModelObj, this.sMSModelObj.id,"sms")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllSMS();
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
    this.getAllSMS();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllSMS();
  }

  }

