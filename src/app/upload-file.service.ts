import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from  'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders(  
    {"Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",  
    "Access-Control-Expose-Headers": "Access-Control-*",
    "Access-Control-Allow-Header": "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD",
    "Allow":"GET, POST, PUT, DELETE, OPTIONS, HEAD"
  }
  )
};
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  url="/matieres/";
  //url="https://krios.azurewebsites.net/api/FileUpload/";  
  constructor(private http: HttpClient) { }
  uploadfile(filetype,fileToUpload):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    formData.append('type',filetype);
    return this.http.post(this.url+"uploadfile",formData,httpOptions)
  }

  getuploadfilehistory():Observable<any>{
    console.log(this.url+"getuploadfilehistory");
    return this.http.get(this.url+"getuploadfilehistory",httpOptions)
  }

  getPaymentHistoryDup():Observable<any>{
    return this.http.get(this.url+"GetPaymentAdviceHistoryDup",httpOptions);
  }

  GetGeneratePaymentAdvanceNote():Observable<any>{
    return this.http.get(this.url+"GetGeneratePaymentAdvanceNote",httpOptions);
  }

  GeneratePaymentAdvanceNote():Observable<any>{
    return this.http.get(this.url+"GeneratePaymentAdvanceNote",httpOptions);
  }

  getPaymentAdvisNoteHeader():Observable<any>{
    return this.http.get(this.url+"getPaymentAdvisNoteHeader",httpOptions);
  }

  chklogin(data):Observable<any>{
    
    console.log("formData===="+JSON.stringify(data));
    
    return this.http.post(this.url+"login",data,httpOptions)
   
  }

  addBetSlip(data):Observable<any>{
    
    console.log("formData===="+JSON.stringify(data));
    
    return this.http.post(this.url+"addBetSlip",data,httpOptions)
   
  }


}
