import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { AmbulanceHireModel } from 'src/app/model/ambulance-hire.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-ambulance-hire',
  templateUrl: './ambulance-hire.component.html',
  styleUrls: ['./ambulance-hire.component.css']
})
export class AmbulanceHireComponent implements OnInit {

  formValue!: FormGroup;
  ambulanceHireModelObj: AmbulanceHireModel = new AmbulanceHireModel();
  ambulanceHireData !: any;

  trueStatusHireData !: any;
  
  checked!: boolean;

  showAdd!:boolean;
  showUpdate!:boolean;



  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllAmbulanceHire();

    this.getTrueStatus();



    this.formValue = this.formBuilder.group({
      ambulanceId: [''],
      type: [''],
      date: [''],
      hiredBy: [''],
      mobile: [''],
      locationFrom: [''],
      locationTo: [''],
      status:[]
    })
  }
  
 statusVal:any=false

checkValue(event:any,id:any){

  if (event.target.checked){
  this.statusVal=true
  }else{
    this.statusVal=false
  }
  this.api.statusUpdate(this.statusVal,id,"ambulance-hire")
  .subscribe((res: any) => {
    this.getTrueStatus();
    alert("AmbulanceHire Updated")
  })
  
}
  clickAddAmbulanceHire(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postAmbulanceHireDetails() {
const obj= this.ambulanceHireModelObj;
const formVal= this.formValue.value;

    obj.ambulanceId = formVal.ambulanceId;
    obj.type = formVal.type;
    obj.date = formVal.date;
    obj.hiredBy = formVal.hiredBy;
    obj.mobile = formVal.mobile;
    obj.locationFrom = formVal.locationFrom;
    obj.locationTo = formVal.locationTo;
    obj.status = formVal.status;
    

    this.api.post(this.ambulanceHireModelObj,"ambulance-hire")
      .subscribe(res => {
        console.log(res);
        alert("AmbulanceHire Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllAmbulanceHire();

      }, _err => {
        alert("Something went worng")
      }
      )
  }

  getTrueStatus(){
    this.api.getTrueStatus("ambulance-hire")
    .subscribe(res=>{
      this.trueStatusHireData=res;
      console.log("trueStatusHireData "+ this.trueStatusHireData);
      
    })
  }


  getAllAmbulanceHire() {
    this.api.get("ambulance-hire")
      .subscribe(res => {
        this.ambulanceHireData = res;
        console.log("ambulanceHireData "+this.ambulanceHireData);
        
       // this.ambulanceHireData.image=this.convertToBase64(this.ambulanceHireData.image);
      })
  }
  deleteAmbulanceHire(row: any) {
    this.api.delete(row.id,"ambulance-hire")
      .subscribe((res: any) => {
        alert("AmbulanceHire Deleted")
        this.getAllAmbulanceHire();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.ambulanceHireModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateAmbulanceHireDetails() {

    // this.ambulanceHireModelObj.firstName = this.formValue.value.firstName;
    // this.ambulanceHireModelObj.lastName = this.formValue.value.lastName;
    // this.ambulanceHireModelObj.email = this.formValue.value.email;
    // this.ambulanceHireModelObj.mobile = this.formValue.value.mobile;
    // this.ambulanceHireModelObj.salary = this.formValue.value.salary;
    
    // this.ambulanceHireModelObj.image=this.base64code;

    this.api.update(this.ambulanceHireModelObj, this.ambulanceHireModelObj.id,"ambulance-hire")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllAmbulanceHire();
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
    this.getAllAmbulanceHire();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllAmbulanceHire();
  }

  }

