import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { BloodBankSupplyModel } from 'src/app/model/blood-bank-supply.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-blood-bank-supply',
  templateUrl: './blood-bank-supply.component.html',
  styleUrls: ['./blood-bank-supply.component.css']
})
export class BloodBankSupplyComponent implements OnInit {

  formValue!: FormGroup;
  bloodBankSupplyModelObj: BloodBankSupplyModel = new BloodBankSupplyModel();
  bloodBankSupplyData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllBloodBankSupply();

    this.formValue = this.formBuilder.group({
      suppliedBy: [''],
      suppliedTo: [''],
      bloodGroup: [''],
      unit: [''],
      mobile: [''],
      location: [''],
      needFor: [''],
      price: [''],
    })
  }

  clickAddBloodBankSupply(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postBloodBankSupplyDetails() {
const obj =this.bloodBankSupplyModelObj;
const formVal=this.formValue.value;

    obj.suppliedBy = formVal.suppliedBy;
    obj.suppliedTo = formVal.suppliedTo;
    obj.bloodGroup = formVal.bloodGroup;
    obj.unit = formVal.unit;
    obj.mobile = formVal.mobile;
    obj.location = formVal.location;
    obj.needFor = formVal.needFor;
    obj.price = formVal.price;
    
    this.api.post(this.bloodBankSupplyModelObj,"blood-bank-supply")
      .subscribe(res => {
        console.log(res);
        alert("BloodBankSupply Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllBloodBankSupply();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllBloodBankSupply() {
    this.api.get("blood-bank-supply")
      .subscribe(res => {
        this.bloodBankSupplyData = res;
        this.bloodBankSupplyData.image=this.convertToBase64(this.bloodBankSupplyData.image);
      })
  }
  deleteBloodBankSupply(row: any) {
    this.api.delete(row.id,"blood-bank-supply")
      .subscribe((res: any) => {
        alert("BloodBankSupply Deleted")
        this.getAllBloodBankSupply();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.bloodBankSupplyModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateBloodBankSupplyDetails() {

    // this.bloodBankSupplyModelObj.firstName = this.formValue.value.firstName;
    // this.bloodBankSupplyModelObj.lastName = this.formValue.value.lastName;
    // this.bloodBankSupplyModelObj.email = this.formValue.value.email;
    // this.bloodBankSupplyModelObj.mobile = this.formValue.value.mobile;
    // this.bloodBankSupplyModelObj.salary = this.formValue.value.salary;
    

    this.api.update(this.bloodBankSupplyModelObj, this.bloodBankSupplyModelObj.id,"blood-bank-supply")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllBloodBankSupply();
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
    this.getAllBloodBankSupply();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllBloodBankSupply();
  }

  }

