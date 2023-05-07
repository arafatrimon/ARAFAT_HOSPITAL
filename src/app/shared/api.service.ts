import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // patient api

  postEmployee(data: any) {
    return this.http.post<any>("http://localhost:8080/employee/save", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }


  getEmployee(){
    return this.http.get<any>("http://localhost:8080/employee/list")
    .pipe(map((res)=>{
      return res;
    }))
  }

  updateEmployee(data: any, id: number) {
    return this.http.put<any>("http://localhost:8080/employee/update/" + id, data)
    .pipe(map((res)=>{
      return res;
    }))
  }
  deleteEmployee(id:number){
    return this.http.delete<any>("http://localhost:8080/employee/delete/"+id)
    .pipe(map((res)=>{
      return res;
    }))
  }

  //Doctor api

  post(data: any,componentName: any) {
    return this.http.post<any>(`http://localhost:8080/${componentName}/save`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  get(componentName: any){
    return this.http.get<any>(`http://localhost:8080/${componentName}/list`)
    .pipe(map((res)=>{
      return res;
    }))
  }

  update(data: any, id: number,componentName: any) {
    return this.http.put<any>(`http://localhost:8080/${componentName}/update/` + id, data)
    .pipe(map((res)=>{
      return res;
    }))
  }
  delete(id:number,componentName: any){
    return this.http.delete<any>(`http://localhost:8080/${componentName}/delete/`+id)
    .pipe(map((res)=>{
      return res;
    }))
  }




  postEmail(data: any) {
    return this.http.post<any>(`http://localhost:8080/sendmail`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  statusUpdate(statusVal: any, id: number,componentName: any) {
    return this.http.get<any>(`http://localhost:8080/${componentName}/status-update/${id}/${statusVal}`)
    .pipe(map((res)=>{
      return res;
    }))
  }

  getPdf(componentName: any){
    return this.http.get<any>(`http://localhost:8080/${componentName}/pdf`)
    .pipe(map((res)=>{
      return res;
    }))
  }




  getTrueStatus(componentName: any){
    return this.http.get<any>(`http://localhost:8080/${componentName}/true-status`)
    .pipe(map((res)=>{
      return res;
    }))
  }

  
}




