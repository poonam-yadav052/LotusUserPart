import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadFileService } from '../upload-file.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  submitted=false;
  loginresult:string;
  userid:string='';
  constructor(private formbuilder:FormBuilder,private spinner:NgxSpinnerService,
    private fileuploadservice:UploadFileService,private router:Router) { 
    this.loginForm = this.formbuilder.group({
      userName: ['',[Validators.required]],
      password: ['',[Validators.required]],
      loginIp:['',[]]
    });
  }

  ngOnInit() {
      let usertoken=localStorage.getItem('usertoken');
      this.userid=usertoken;
      console.log(this.userid);
      if(this.userid != "" && this.userid != null)
      {
        this.router.navigate(['../home/']);
      }
      else{
        localStorage.setItem('usertoken',"");
      }
    
  }

  get f() {return this.loginForm.controls}

  onSubmit(customerData) {
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.spinner.show();
    // Process checkout data here
    // localStorage.clear();
    //       localStorage.setItem('usertoken',"true");
    //       localStorage.setItem('userName',this.f.userName.value);
    //       localStorage.setItem('userId',"1");
    //       this.router.navigate(['../home/']);
    //       this.loginForm.reset();
          //this.spinner.hide();
    let data: any = Object.assign(customerData);     
    this.fileuploadservice.chklogin(data).subscribe(
      data=>{
        //alert();
        console.log("Success")
        console.log("data==="+JSON.stringify(data))
        console.log("message=="+data.messege)
        console.log("result=="+JSON.stringify(data.result))
        console.log("result 0==="+data.result[0]);
        
        this.spinner.hide();
        if(data.messege == "Success")
        {         
          //alert(); 
          localStorage.clear();
          localStorage.setItem('usertoken',"true");
          localStorage.setItem('username',data.result[0].loginName);
          localStorage.setItem('userId',data.result[0].ID);
          this.router.navigate(['../home/']);
          this.loginForm.reset();
        }      
        else{
          this.loginresult="Login Failed. Please try again";
        }
        
      },
      error=>{
        this.spinner.hide();
        console.log("Login Failed")
        console.log(error)
        this.loginresult="Login Failed. Please try again";
      })
    
  }

}
