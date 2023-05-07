import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { AttendanceModel } from 'src/app/model/attendance.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  formValue!: FormGroup;
  attendanceModelObj: AttendanceModel = new AttendanceModel();
  attendanceData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  // constructor(private formBuilder: FormBuilder,
  //   private api: ApiService) { }


  public now: Date = new Date();

   constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    ) {

      setInterval(() => {
        this.now = new Date();
      }, 1);

     }
 
   




  ngOnInit(): void {

    console.log(this.now);
    
  
    this.getAllAttendance();

    this.formValue = this.formBuilder.group({
      employeeId: [''],
      employeeName: [''],
      shift: [''],
      date: [''],
      timeIn: [''],
      timeOut: [''],
    })
  }

  clickAddAttendance(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postAttendanceDetails() {
const obj =this.attendanceModelObj;
const formVal =this.formValue.value;

    obj.employeeId = formVal.employeeId;
    obj.employeeName = formVal.employeeName;
    obj.shift = formVal.shift;
    obj.date = formVal.date;
    obj.timeIn = formVal.timeIn;
    obj.timeOut = formVal.timeOut;
   

    this.api.post(this.attendanceModelObj,"attendance")
      .subscribe(res => {
        console.log(res);
        alert("Attendance Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllAttendance();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllAttendance() {
    this.api.get("attendance")
      .subscribe(res => {
        this.attendanceData = res;
      })
  }
  deleteAttendance(row: any) {
    this.api.delete(row.id,"attendance")
      .subscribe((res: any) => {
        alert("Attendance Deleted")
        this.getAllAttendance();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.attendanceModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateAttendanceDetails() {

    // this.attendanceModelObj.firstName = this.formValue.value.firstName;
    // this.attendanceModelObj.lastName = this.formValue.value.lastName;
    // this.attendanceModelObj.email = this.formValue.value.email;
    // this.attendanceModelObj.mobile = this.formValue.value.mobile;
    // this.attendanceModelObj.salary = this.formValue.value.salary;
    
    // this.attendanceModelObj.image=this.base64code;

    // this.api.update(this.attendanceModelObj, this.attendanceModelObj.id,"attendance")
    //   .subscribe((res: any)=>{
    //     alert("Updated Successfully");
    //     let ref = document.getElementById('cancel')
    //     ref?.click();
    //     this.formValue.reset();
    //     this.getAllAttendance();
    //   })

    }


    onDetails(row:any) {
      
      this.onEdit(row);
      this.showAdd=false;
      this.showUpdate=false;
  }
  
  searchText='';





  //pagination

  POSTS:any;
  page:number=1;
  count:number=0;
  tableSize:number=10;
  tableSizes:any=[5,10,15,20];

  onTableDataChange(event:any){
    this.page=event;
    this.getAllAttendance();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllAttendance();
  }

  }

