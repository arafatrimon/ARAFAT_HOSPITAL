import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { HumanResourceCategoryModel } from 'src/app/model/human-resource-category.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-human-resource-category',
  templateUrl: './human-resource-category.component.html',
  styleUrls: ['./human-resource-category.component.css']
})
export class HumanResourceCategoryComponent implements OnInit {
  formValue!: FormGroup;
  humanResourceCategoryModelObj: HumanResourceCategoryModel = new HumanResourceCategoryModel();
  humanResourceCategoryData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllHumanResourceCategory();

    this.formValue = this.formBuilder.group({
      categoryId: [''],
      categoryName: [''],
      details: [''],
      salary: ['']
    })
  }

  clickAddHumanResourceCategory(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postHumanResourceCategoryDetails() {
    this.humanResourceCategoryModelObj.categoryId = this.formValue.value.categoryId;
    this.humanResourceCategoryModelObj.categoryName = this.formValue.value.categoryName;
    this.humanResourceCategoryModelObj.details = this.formValue.value.details;
    this.humanResourceCategoryModelObj.salary = this.formValue.value.salary;
   
    this.api.post(this.humanResourceCategoryModelObj,"human-resource-category")
      .subscribe(res => {
        console.log(res);
        alert("HumanResourceCategory Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllHumanResourceCategory();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllHumanResourceCategory() {
    this.api.get("human-resource-category")
      .subscribe(res => {
        this.humanResourceCategoryData = res;
        this.humanResourceCategoryData.image=this.convertToBase64(this.humanResourceCategoryData.image);
      })
  }
  deleteHumanResourceCategory(row: any) {
    this.api.delete(row.id,"human-resource-category")
      .subscribe((res: any) => {
        alert("HumanResourceCategory Deleted")
        this.getAllHumanResourceCategory();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.humanResourceCategoryModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateHumanResourceCategoryDetails() {

    // this.humanResourceCategoryModelObj.firstName = this.formValue.value.firstName;
    // this.humanResourceCategoryModelObj.lastName = this.formValue.value.lastName;
    // this.humanResourceCategoryModelObj.email = this.formValue.value.email;
    // this.humanResourceCategoryModelObj.mobile = this.formValue.value.mobile;
    // this.humanResourceCategoryModelObj.salary = this.formValue.value.salary;
    
    // this.humanResourceCategoryModelObj.image=this.base64code;

    this.api.update(this.humanResourceCategoryModelObj, this.humanResourceCategoryModelObj.id,"human-resource-category")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllHumanResourceCategory();
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
    this.getAllHumanResourceCategory();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllHumanResourceCategory();
  }

  }

