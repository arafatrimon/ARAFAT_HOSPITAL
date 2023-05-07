import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { MedicineModel } from 'src/app/model/medicine.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {

  formValue!: FormGroup;
  medicineModelObj: MedicineModel = new MedicineModel();
  medicineData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllMedicine();

    this.formValue = this.formBuilder.group({
      medicineId: [''],
      name: [''],
      category: [''],
      mobile: [''],
      mfgDate: [''],
      expDate: [''],
      batchNo: [''],
      companyName: [''],
      purchaseDate: [''],
      purchaseRate: [''],
      sellingRate: [''],

    })
  }

  clickAddMedicine(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postMedicineDetails() {
    this.medicineModelObj.medicineId = this.formValue.value.medicineId;
    this.medicineModelObj.name = this.formValue.value.name;
    this.medicineModelObj.category = this.formValue.value.category;
    this.medicineModelObj.mobile = this.formValue.value.mobile;
    this.medicineModelObj.mfgDate = this.formValue.value.mfgDate;
    this.medicineModelObj.expDate = this.formValue.value.expDate;
    this.medicineModelObj.batchNo = this.formValue.value.batchNo;
    this.medicineModelObj.companyName = this.formValue.value.companyName;
    this.medicineModelObj.purchaseDate = this.formValue.value.purchaseDate;
    this.medicineModelObj.purchaseRate = this.formValue.value.purchaseRate;
    this.medicineModelObj.sellingRate = this.formValue.value.sellingRate;
    

    this.api.post(this.medicineModelObj,"medicine")
      .subscribe(res => {
        console.log(res);
        alert("Medicine Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllMedicine();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllMedicine() {
    this.api.get("medicine")
      .subscribe(res => {
        this.medicineData = res;
        this.medicineData.image=this.convertToBase64(this.medicineData.image);
      })
  }
  deleteMedicine(row: any) {
    this.api.delete(row.id,"medicine")
      .subscribe((res: any) => {
        alert("Medicine Deleted")
        this.getAllMedicine();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.medicineModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateMedicineDetails() {

    // this.medicineModelObj.firstName = this.formValue.value.firstName;
    // this.medicineModelObj.lastName = this.formValue.value.lastName;
    // this.medicineModelObj.email = this.formValue.value.email;
    // this.medicineModelObj.mobile = this.formValue.value.mobile;
    // this.medicineModelObj.salary = this.formValue.value.salary;
    
    // this.medicineModelObj.image=this.base64code;

    this.api.update(this.medicineModelObj, this.medicineModelObj.id,"medicine")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllMedicine();
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
    this.getAllMedicine();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllMedicine();
  }

  }

