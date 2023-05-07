import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { MedicineCategoryModel } from 'src/app/model/medicine-category.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-medicine-category',
  templateUrl: './medicine-category.component.html',
  styleUrls: ['./medicine-category.component.css']
})
export class MedicineCategoryComponent implements OnInit {

  formValue!: FormGroup;
  medicineCategoryModelObj: MedicineCategoryModel = new MedicineCategoryModel();
  medicineCategoryData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllMedicineCategory();

    this.formValue = this.formBuilder.group({
      categoryId: [''],
      categoryName: [''],
      details: ['']
    })
  }

  clickAddMedicineCategory(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postMedicineCategoryDetails() {
    this.medicineCategoryModelObj.categoryId = this.formValue.value.categoryId;
    this.medicineCategoryModelObj.categoryName = this.formValue.value.categoryName;
    this.medicineCategoryModelObj.details = this.formValue.value.details;
   

    this.api.post(this.medicineCategoryModelObj,"medicine-category")
      .subscribe(res => {
        console.log(res);
        alert("MedicineCategory Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllMedicineCategory();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllMedicineCategory() {
    this.api.get("medicine-category")
      .subscribe(res => {
        this.medicineCategoryData = res;
        this.medicineCategoryData.image=this.convertToBase64(this.medicineCategoryData.image);
      })
  }
  deleteMedicineCategory(row: any) {
    this.api.delete(row.id,"medicine-category")
      .subscribe((res: any) => {
        alert("MedicineCategory Deleted")
        this.getAllMedicineCategory();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.medicineCategoryModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateMedicineCategoryDetails() {

    // this.medicineCategoryModelObj.firstName = this.formValue.value.firstName;
    // this.medicineCategoryModelObj.lastName = this.formValue.value.lastName;
    // this.medicineCategoryModelObj.email = this.formValue.value.email;
    // this.medicineCategoryModelObj.mobile = this.formValue.value.mobile;
    // this.medicineCategoryModelObj.salary = this.formValue.value.salary;
    
    // this.medicineCategoryModelObj.image=this.base64code;

    this.api.update(this.medicineCategoryModelObj, this.medicineCategoryModelObj.id,"medicine-category")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllMedicineCategory();
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
    this.getAllMedicineCategory();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllMedicineCategory();
  }

  }

