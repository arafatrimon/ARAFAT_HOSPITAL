import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { BloodDonorModel } from 'src/app/model/blood-donor.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-blood-donor',
  templateUrl: './blood-donor.component.html',
  styleUrls: ['./blood-donor.component.css']
})
export class BloodDonorComponent implements OnInit {

  formValue!: FormGroup;
  bloodDonorModelObj: BloodDonorModel = new BloodDonorModel();
  bloodDonorData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllBloodDonor();

    this.formValue = this.formBuilder.group({
      donorId: [''],
      donorName: [''],
      email: [''],
      mobile: [''],
      address: [''],
      bloodGroup: [''],
      donationDate: [''],
    })
  }

  clickAddBloodDonor(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postBloodDonorDetails() {


    this.bloodDonorModelObj.donorId = this.formValue.value.donorId;
    this.bloodDonorModelObj.donorName = this.formValue.value.donorName;
    this.bloodDonorModelObj.email = this.formValue.value.email;
    this.bloodDonorModelObj.mobile = this.formValue.value.mobile;
    this.bloodDonorModelObj.address = this.formValue.value.address;
    this.bloodDonorModelObj.bloodGroup = this.formValue.value.bloodGroup;
    this.bloodDonorModelObj.donationDate = this.formValue.value.donationDate;
   

    this.api.post(this.bloodDonorModelObj,"blood-donor")
      .subscribe(res => {
        console.log(res);
        alert("BloodDonor Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllBloodDonor();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllBloodDonor() {
    this.api.get("blood-donor")
      .subscribe(res => {
        this.bloodDonorData = res;
        this.bloodDonorData.image=this.convertToBase64(this.bloodDonorData.image);
      })
  }
  deleteBloodDonor(row: any) {
    this.api.delete(row.id,"blood-donor")
      .subscribe((res: any) => {
        alert("BloodDonor Deleted")
        this.getAllBloodDonor();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.bloodDonorModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateBloodDonorDetails() {

    // this.bloodDonorModelObj.firstName = this.formValue.value.firstName;
    // this.bloodDonorModelObj.lastName = this.formValue.value.lastName;
    // this.bloodDonorModelObj.email = this.formValue.value.email;
    // this.bloodDonorModelObj.mobile = this.formValue.value.mobile;
    // this.bloodDonorModelObj.salary = this.formValue.value.salary;
    
  

    this.api.update(this.bloodDonorModelObj, this.bloodDonorModelObj.id,"blood-donor")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllBloodDonor();
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
    this.getAllBloodDonor();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllBloodDonor();
  }

  }

