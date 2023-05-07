import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { AmbulanceExpendatureModel } from 'src/app/model/ambulance-expendature.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-anbulance-expendature',
  templateUrl: './anbulance-expendature.component.html',
  styleUrls: ['./anbulance-expendature.component.css']
})
export class AnbulanceExpendatureComponent implements OnInit {

  formValue!: FormGroup;
  ambulanceExpendatureModelObj: AmbulanceExpendatureModel = new AmbulanceExpendatureModel();
  ambulanceExpendatureData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllAmbulanceExpendature();

    this.formValue = this.formBuilder.group({
      ambulanceId: [''],
      title: [''],
      details: [''],
      date: [''],
      cost: [''],
      costMaintainBy:['']
    })
  }

  clickAddAmbulanceExpendature(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postAmbulanceExpendatureDetails() {
const obj = this.ambulanceExpendatureModelObj;
const formVal = this.formValue.value

    obj.ambulanceId = formVal.ambulanceId;
    obj.title = formVal.title;
    obj.details = formVal.details;
    obj.date = formVal.date;
    obj.cost = formVal.cost;
    obj.costMaintainBy=formVal.costMaintainBy;

    this.api.post(this.ambulanceExpendatureModelObj,"ambulance-expendature")
      .subscribe(res => {
        console.log(res);
        alert("AmbulanceExpendature Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllAmbulanceExpendature();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllAmbulanceExpendature() {
    this.api.get("ambulance-expendature")
      .subscribe(res => {
        this.ambulanceExpendatureData = res;
        this.ambulanceExpendatureData.image=this.convertToBase64(this.ambulanceExpendatureData.image);
      })
  }
  deleteAmbulanceExpendature(row: any) {
    this.api.delete(row.id,"ambulance-expendature")
      .subscribe((res: any) => {
        alert("AmbulanceExpendature Deleted")
        this.getAllAmbulanceExpendature();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.ambulanceExpendatureModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateAmbulanceExpendatureDetails() {

    // this.ambulanceExpendatureModelObj.firstName = this.formValue.value.firstName;
    // this.ambulanceExpendatureModelObj.lastName = this.formValue.value.lastName;
    // this.ambulanceExpendatureModelObj.email = this.formValue.value.email;
    // this.ambulanceExpendatureModelObj.mobile = this.formValue.value.mobile;
    // this.ambulanceExpendatureModelObj.salary = this.formValue.value.salary;
    
    // this.ambulanceExpendatureModelObj.image=this.base64code;

    // this.api.update(this.ambulanceExpendatureModelObj, this.ambulanceExpendatureModelObj.id,"ambulance-expendature")
    //   .subscribe((res: any)=>{
    //     alert("Updated Successfully");
    //     let ref = document.getElementById('cancel')
    //     ref?.click();
    //     this.formValue.reset();
    //     this.getAllAmbulanceExpendature();
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
    this.getAllAmbulanceExpendature();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllAmbulanceExpendature();
  }

  }

