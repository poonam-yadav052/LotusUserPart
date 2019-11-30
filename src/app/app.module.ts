import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentreconsilationComponent } from './pages/paymentreconsilation/paymentreconsilation.component';
import { FormsModule ,FormBuilder,FormGroup,ReactiveFormsModule,FormControl  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BsDatepickerModule,BsModalRef,ModalModule,CarouselModule} from 'ngx-bootstrap';
import { UploadFileService } from './upload-file.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { ShellComponent } from './shell/shell.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PaymentreconsilationComponent,
    ShellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule, NgxPaginationModule,MatButtonModule,
    MatDialogModule
  ],
  providers: [UploadFileService,BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
