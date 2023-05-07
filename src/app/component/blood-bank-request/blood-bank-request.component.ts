import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { BloodBankRequestModel } from 'src/app/model/blood-bank-request.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-blood-bank-request',
  templateUrl: './blood-bank-request.component.html',
  styleUrls: ['./blood-bank-request.component.css']
})
export class BloodBankRequestComponent implements OnInit {
  formValue!: FormGroup;
  bloodBankRequestModelObj: BloodBankRequestModel = new BloodBankRequestModel();
  bloodBankRequestData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllBloodBankRequest();

    this.formValue = this.formBuilder.group({
      requestBy: [''],
      bloodGroup: [''],
      location: [''],
      mobile: [''],
      needFor: [''],
      type: [''],
      unit: [''],
      
    })
  }

  clickAddBloodBankRequest(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postBloodBankRequestDetails() {
    this.bloodBankRequestModelObj.requestBy = this.formValue.value.requestBy;
    this.bloodBankRequestModelObj.bloodGroup = this.formValue.value.bloodGroup;
    this.bloodBankRequestModelObj.location = this.formValue.value.location;
    this.bloodBankRequestModelObj.mobile = this.formValue.value.mobile;
    this.bloodBankRequestModelObj.needFor = this.formValue.value.needFor;
    this.bloodBankRequestModelObj.type = this.formValue.value.type;
    this.bloodBankRequestModelObj.unit = this.formValue.value.unit;
    

    this.api.post(this.bloodBankRequestModelObj,"blood-bank-request")
      .subscribe(res => {
        console.log(res);
        alert("BloodBankRequest Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllBloodBankRequest();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllBloodBankRequest() {
    this.api.get("blood-bank-request")
      .subscribe(res => {
        this.bloodBankRequestData = res;
        this.bloodBankRequestData.image=this.convertToBase64(this.bloodBankRequestData.image);
      })
  }
  deleteBloodBankRequest(row: any) {
    this.api.delete(row.id,"blood-bank-request")
      .subscribe((res: any) => {
        alert("BloodBankRequest Deleted")
        this.getAllBloodBankRequest();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.bloodBankRequestModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateBloodBankRequestDetails() {

    // this.bloodBankRequestModelObj.firstName = this.formValue.value.firstName;
    // this.bloodBankRequestModelObj.lastName = this.formValue.value.lastName;
    // this.bloodBankRequestModelObj.email = this.formValue.value.email;
    // this.bloodBankRequestModelObj.mobile = this.formValue.value.mobile;
    // this.bloodBankRequestModelObj.salary = this.formValue.value.salary;
    
    // this.bloodBankRequestModelObj.image=this.base64code;

    this.api.update(this.bloodBankRequestModelObj, this.bloodBankRequestModelObj.id,"blood-bank-request")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllBloodBankRequest();
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
    this.getAllBloodBankRequest();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllBloodBankRequest();
  }

  }

