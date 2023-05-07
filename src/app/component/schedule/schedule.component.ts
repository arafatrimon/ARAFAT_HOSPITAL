import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { ScheduleModel } from 'src/app/model/schedule.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  formValue!: FormGroup;
  scheduleModelObj: ScheduleModel = new ScheduleModel();
  scheduleData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllSchedule();

    this.formValue = this.formBuilder.group({
      availableDays: [''],
      availableTime: [''],
      perPatientTime: [''],
      serialVisibility: [''],
      status: ['']
    })
  }

  clickAddSchedule(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postScheduleDetails() {
    this.scheduleModelObj.availableDays = this.formValue.value.availableDays;
    this.scheduleModelObj.availableTime = this.formValue.value.availableTime;
    this.scheduleModelObj.perPatientTime = this.formValue.value.perPatientTime;
    this.scheduleModelObj.serialVisibility = this.formValue.value.serialVisibility;
    this.scheduleModelObj.status = this.formValue.value.status;
  

    this.api.post(this.scheduleModelObj,"schedule")
      .subscribe(res => {
        console.log(res);
        alert("Schedule Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllSchedule();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllSchedule() {
    this.api.get("schedule")
      .subscribe(res => {
        this.scheduleData = res;
        this.scheduleData.image=this.convertToBase64(this.scheduleData.image);
      })
  }
  deleteSchedule(row: any) {
    this.api.delete(row.id,"schedule")
      .subscribe((res: any) => {
        alert("Schedule Deleted")
        this.getAllSchedule();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.scheduleModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateScheduleDetails() {

    // this.scheduleModelObj.firstName = this.formValue.value.firstName;
    // this.scheduleModelObj.lastName = this.formValue.value.lastName;
    // this.scheduleModelObj.email = this.formValue.value.email;
    // this.scheduleModelObj.mobile = this.formValue.value.mobile;
    // this.scheduleModelObj.salary = this.formValue.value.salary;
    
    // this.scheduleModelObj.image=this.base64code;

    this.api.update(this.scheduleModelObj, this.scheduleModelObj.id,"schedule")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllSchedule();
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
    this.getAllSchedule();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllSchedule();
  }

  }

