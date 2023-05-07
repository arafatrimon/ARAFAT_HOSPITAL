import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { DeathReportModel } from 'src/app/model/death-report.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-death-report',
  templateUrl: './death-report.component.html',
  styleUrls: ['./death-report.component.css']
})
export class DeathReportComponent implements OnInit {

  formValue!: FormGroup;
  deathReportModelObj: DeathReportModel = new DeathReportModel();
  deathReportData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAlldeathReport();

    this.formValue = this.formBuilder.group({
      patientId: [''],
      name: [''],
      deathFor: [''],
      address: [''],
      date: [''],
      title: [''],
      description: [''],
      status: [''],
    })
  }

  clickAdddeathReport(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postdeathReportDetails() {
    this.deathReportModelObj.patientId = this.formValue.value.patientId;
    this.deathReportModelObj.name = this.formValue.value.name;
    this.deathReportModelObj.deathFor = this.formValue.value.deathFor;
    this.deathReportModelObj.address = this.formValue.value.address;
    this.deathReportModelObj.date = this.formValue.value.date;
    this.deathReportModelObj.title = this.formValue.value.title;
    this.deathReportModelObj.description = this.formValue.value.description;
    this.deathReportModelObj.status = this.formValue.value.status;
   
    this.api.post(this.deathReportModelObj,"death-report")
      .subscribe(res => {
        console.log(res);
        alert("DeathReport Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAlldeathReport();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAlldeathReport() {
    this.api.get("death-report")
      .subscribe(res => {
        this.deathReportData = res;
        this.deathReportData.image=this.convertToBase64(this.deathReportData.image);
      })
  }
  deletedeathReport(row: any) {
    this.api.delete(row.id,"death-report")
      .subscribe((res: any) => {
        alert("DeathReport Deleted")
        this.getAlldeathReport();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.deathReportModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updatedeathReportDetails() {

    // this.deathReportModelObj.firstName = this.formValue.value.firstName;
    // this.deathReportModelObj.lastName = this.formValue.value.lastName;
    // this.deathReportModelObj.email = this.formValue.value.email;
    // this.deathReportModelObj.mobile = this.formValue.value.mobile;
    // this.deathReportModelObj.salary = this.formValue.value.salary;
    
    // this.deathReportModelObj.image=this.base64code;

    this.api.update(this.deathReportModelObj, this.deathReportModelObj.id,"death-report")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAlldeathReport();
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
    this.getAlldeathReport();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAlldeathReport();
  }

  }

