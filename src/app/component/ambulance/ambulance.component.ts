import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { AmbulanceModel } from 'src/app/model/ambulance.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-ambulance',
  templateUrl: './ambulance.component.html',
  styleUrls: ['./ambulance.component.css']
})
export class AmbulanceComponent implements OnInit {
  formValue!: FormGroup;
  ambulanceModelObj: AmbulanceModel = new AmbulanceModel();
  ambulanceData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllAmbulance();

    this.formValue = this.formBuilder.group({
      ambulanceId: [''],
      licenseNo: [''],
      purchaseValue: [''],
      category: [''],
      chassisNo: [''],
      fuelType: [''],
      driverName: [''],
      driverLicenseNo: [''],
      driverPhoneNo: ['']
    })
  }

  clickAddAmbulance(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postAmbulanceDetails() {
    const obj= this.ambulanceModelObj;
    const formVal=this.formValue.value;
    obj.ambulanceId = formVal.ambulanceId;
    obj.licenseNo = formVal.licenseNo;
    obj.purchaseValue =formVal.purchaseValue;
    obj.category = formVal.category;
    obj.chassisNo = formVal.chassisNo;
    obj.fuelType = formVal.fuelType;
    obj.driverName =formVal.driverName;
    obj.driverLicenseNo =formVal.driverLicenseNo;
    obj.driverPhoneNo = formVal.driverPhoneNo;
 

    this.api.post(this.ambulanceModelObj,"ambulance")
      .subscribe(res => {
        console.log(res);
        alert("Ambulance Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllAmbulance();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllAmbulance() {
    this.api.get("ambulance")
      .subscribe(res => {
        this.ambulanceData = res;
        this.ambulanceData.image=this.convertToBase64(this.ambulanceData.image);
      })
  }
  deleteAmbulance(row: any) {
    this.api.delete(row.id,"ambulance")
      .subscribe((res: any) => {
        alert("Ambulance Deleted")
        this.getAllAmbulance();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.ambulanceModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateAmbulanceDetails() {

    // this.ambulanceModelObj.firstName = this.formValue.value.firstName;
    // this.ambulanceModelObj.lastName = this.formValue.value.lastName;
    // this.ambulanceModelObj.email = this.formValue.value.email;
    // this.ambulanceModelObj.mobile = this.formValue.value.mobile;
    // this.ambulanceModelObj.salary = this.formValue.value.salary;
    
    // this.ambulanceModelObj.image=this.base64code;

    // this.api.update(this.ambulanceModelObj, this.ambulanceModelObj.id,"ambulance")
    //   .subscribe((res: any)=>{
    //     alert("Updated Successfully");
    //     let ref = document.getElementById('cancel')
    //     ref?.click();
    //     this.formValue.reset();
    //     this.getAllAmbulance();
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
  tableSize:number=10;
  tableSizes:any=[5,10,15,20];

  onTableDataChange(event:any){
    this.page=event;
    this.getAllAmbulance();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllAmbulance();
  }

  }

