import { Component, OnInit } from '@angular/core';
//import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadFileService } from '../../upload-file.service';
import { Router } from '@angular/router';
import { timer, of, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  EventTypeName = [
    {"0":"Favourites"},
    {"1":"Sports"},
    {"2":"Cricket"},
    {"3":"Football"},
    {"4":"Horse Racing"},
    {"5":"Greyhound Racing"}];
  betSlipForm:FormGroup;
  eventNameArr:any = [];
  activeTab = 'betSlip';
  isActive = true;
  betSlipError = false;
  betONOFF = true;
  betSlip:boolean = true;
  openBets:boolean = false;
  Back:boolean = true;
  Lay:boolean = false;
  price = "";
  stake = "";
  stateFocus:boolean = false;
  runners:any = [];
  sizeDisplay:boolean = false;
  alive = true;
  alive1 = true;
  stake1:number = 0;
  stake2:number = 0;
  stake3:number = 0;
  stake4:number = 0;
  stake5:number = 0;
  stake6:number = 0;
  availableCredit:any = 0.00; 
  addBetSlipResult:any = [];
  oneClickStatus:boolean = false;  
  MarketID = "";
  inPlay = "";
  selectionId = "";
  betConfrimation:boolean = false;
  betType = "";
  EventName_0="0";EventName_1="0";EventName_2="0";EventName_3="0";EventName_4="0";EventName_5="0";EventName_6="0";EventName_7="0";EventName_8="0";EventName_9="0";EventName_10="0";EventName_11="0";EventName_12="0";EventName_13="0";EventName_14="0";
  backBetPrice_0_1 = '0';layBetPrice_0_1 = '0';
  backBetPrice_0_2 = '0';layBetPrice_0_2 = '0';
  backBetPrice_0_3 = '0';layBetPrice_0_3 = '0';
  backBetPrice_1_1 = '0';layBetPrice_1_1 = '0';
  backBetPrice_1_2 = '0';layBetPrice_1_2 = '0';
  backBetPrice_1_3 = '0';layBetPrice_1_3 = '0';
  backBetPrice_2_1 = '0';layBetPrice_2_1 = '0';
  backBetPrice_2_2 = '0';layBetPrice_2_2 = '0';
  backBetPrice_2_3 = '0';layBetPrice_2_3 = '0';
  backBetPrice_3_1 = '0';layBetPrice_3_1 = '0';
  backBetPrice_3_2 = '0';layBetPrice_3_2 = '0';
  backBetPrice_3_3 = '0';layBetPrice_3_3 = '0';
  backBetPrice_4_1 = '0';layBetPrice_4_1 = '0';
  backBetPrice_4_2 = '0';layBetPrice_4_2 = '0';
  backBetPrice_4_3 = '0';layBetPrice_4_3 = '0';
  backBetPrice_5_1 = '0';layBetPrice_5_1 = '0';
  backBetPrice_5_2 = '0';layBetPrice_5_2 = '0';
  backBetPrice_5_3 = '0';layBetPrice_5_3 = '0';
  backBetPrice_6_1 = '0';layBetPrice_6_1 = '0';
  backBetPrice_6_2 = '0';layBetPrice_6_2 = '0';
  backBetPrice_6_3 = '0';layBetPrice_6_3 = '0';
  backBetPrice_7_1 = '0';layBetPrice_7_1 = '0';
  backBetPrice_7_2 = '0';layBetPrice_7_2 = '0';
  backBetPrice_7_3 = '0';layBetPrice_7_3 = '0';
  backBetPrice_8_1 = '0';layBetPrice_8_1 = '0';
  backBetPrice_8_2 = '0';layBetPrice_8_2 = '0';
  backBetPrice_8_3 = '0';layBetPrice_8_3 = '0';
  backBetPrice_9_1 = '0';layBetPrice_9_1 = '0';
  backBetPrice_9_2 = '0';layBetPrice_9_2 = '0';
  backBetPrice_9_3 = '0';layBetPrice_9_3 = '0';
  backBetPrice_10_1 = '0';layBetPrice_10_1 = '0';
  backBetPrice_10_2 = '0';layBetPrice_10_2 = '0';
  backBetPrice_10_3 = '0';layBetPrice_10_3 = '0';
  backBetPrice_11_1 = '0';layBetPrice_11_1 = '0';
  backBetPrice_11_2 = '0';layBetPrice_11_2 = '0';
  backBetPrice_11_3 = '0';layBetPrice_11_3 = '0';
  backBetPrice_12_1 = '0';layBetPrice_12_1 = '0';
  backBetPrice_12_2 = '0';layBetPrice_12_2 = '0';
  backBetPrice_12_3 = '0';layBetPrice_12_3 = '0';
  backBetPrice_13_1 = '0';layBetPrice_13_1 = '0';
  backBetPrice_13_2 = '0';layBetPrice_13_2 = '0';
  backBetPrice_13_3 = '0';layBetPrice_13_3 = '0';
  backBetPrice_14_1 = '0';layBetPrice_14_1 = '0';
  backBetPrice_14_2 = '0';layBetPrice_14_2 = '0';
  backBetPrice_14_3 = '0';layBetPrice_14_3 = '0';
  
  backBetSize_0_1 = '0';layBetSize_0_1 = '0';
  backBetSize_0_2 = '0';layBetSize_0_2 = '0';
  backBetSize_0_3 = '0';layBetSize_0_3 = '0';
  backBetSize_1_1 = '0';layBetSize_1_1 = '0';
  backBetSize_1_2 = '0';layBetSize_1_2 = '0';
  backBetSize_1_3 = '0';layBetSize_1_3 = '0';
  backBetSize_2_1 = '0';layBetSize_2_1 = '0';
  backBetSize_2_2 = '0';layBetSize_2_2 = '0';
  backBetSize_2_3 = '0';layBetSize_2_3 = '0';
  backBetSize_3_1 = '0';layBetSize_3_1 = '0';
  backBetSize_3_2 = '0';layBetSize_3_2 = '0';
  backBetSize_3_3 = '0';layBetSize_3_3 = '0';
  backBetSize_4_1 = '0';layBetSize_4_1 = '0';
  backBetSize_4_2 = '0';layBetSize_4_2 = '0';
  backBetSize_4_3 = '0';layBetSize_4_3 = '0';
  backBetSize_5_1 = '0';layBetSize_5_1 = '0';
  backBetSize_5_2 = '0';layBetSize_5_2 = '0';
  backBetSize_5_3 = '0';layBetSize_5_3 = '0';
  backBetSize_6_1 = '0';layBetSize_6_1 = '0';
  backBetSize_6_2 = '0';layBetSize_6_2 = '0';
  backBetSize_6_3 = '0';layBetSize_6_3 = '0';
  backBetSize_7_1 = '0';layBetSize_7_1 = '0';
  backBetSize_7_2 = '0';layBetSize_7_2 = '0';
  backBetSize_7_3 = '0';layBetSize_7_3 = '0';
  backBetSize_8_1 = '0';layBetSize_8_1 = '0';
  backBetSize_8_2 = '0';layBetSize_8_2 = '0';
  backBetSize_8_3 = '0';layBetSize_8_3 = '0';
  backBetSize_9_1 = '0';layBetSize_9_1 = '0';
  backBetSize_9_2 = '0';layBetSize_9_2 = '0';
  backBetSize_9_3 = '0';layBetSize_9_3 = '0';
  backBetSize_10_1 = '0';layBetSize_10_1 = '0';
  backBetSize_10_2 = '0';layBetSize_10_2 = '0';
  backBetSize_10_3 = '0';layBetSize_10_3 = '0';
  backBetSize_11_1 = '0';layBetSize_11_1 = '0';
  backBetSize_11_2 = '0';layBetSize_11_2 = '0';
  backBetSize_11_3 = '0';layBetSize_11_3 = '0';
  backBetSize_12_1 = '0';layBetSize_12_1 = '0';
  backBetSize_12_2 = '0';layBetSize_12_2 = '0';
  backBetSize_12_3 = '0';layBetSize_12_3 = '0';
  backBetSize_13_1 = '0';layBetSize_13_1 = '0';
  backBetSize_13_2 = '0';layBetSize_13_2 = '0';
  backBetSize_13_3 = '0';layBetSize_13_3 = '0';
  backBetSize_14_1 = '0';layBetSize_14_1 = '0';
  backBetSize_14_2 = '0';layBetSize_14_2 = '0';
  backBetSize_14_3 = '0';layBetSize_14_3 = '0';
  inPlay_0 = false;inPlay_1 = false;inPlay_2 = false;inPlay_3 = false;inPlay_4 = false;inPlay_5 = false;inPlay_6 = false;inPlay_7 = false;inPlay_8 = false;inPlay_9 = false;inPlay_10 = false;inPlay_11 = false;inPlay_12 = false;inPlay_13 = false;inPlay_14 = false;
  marketId_0 = "0";marketId_1 = "0";marketId_2 = "0";marketId_3 = "0";marketId_4 = "0";marketId_5 = "0";marketId_6 = "0";marketId_7 = "0";marketId_8 = "0";marketId_9 = "0";marketId_10 = "0";marketId_11 = "0";marketId_12 = "0";marketId_13 = "0";marketId_14 = "0";
  EventName_ = 0;
  liability = "0.00";
  profit= "0.00";
  matchId = "0";
  runnerId = "0";
  message = "";
  spinnerSubscription = false;
  spinnerService = {spinnerObservable:""};
  spinnerObservable = [];
  showSpinner = false;
  loadingText = "";
  type = "";
  counter = 0;
  timersDivStatus = false;
  confrimationMsgStatus = false;
  eventHeader = "Cricket";
  mainTable:boolean = true;
  subTable:boolean = false;
  userId = localStorage.getItem('userId');  
  constructor(private http: HttpClient,private formBuilder:FormBuilder,private fileuploadservice:UploadFileService,private router:Router,private spinner:NgxSpinnerService) { 
    
  }
  blankVariables(){
    //alert();
    this.marketId_0 = "0";this.marketId_1 = "0";this.marketId_2 = "0";this.marketId_3 = "0";this.marketId_4 = "0";this.marketId_5 = "0";this.marketId_6 = "0";this.marketId_7 = "0";this.marketId_8 = "0";this.marketId_9 = "0";this.marketId_10 = "0";this.marketId_11 = "0";this.marketId_12 = "0";this.marketId_13 = "0";this.marketId_14 = "0";
    this.EventName_0="0";this.EventName_1="0";this.EventName_2="0";this.EventName_3="0";this.EventName_4="0";this.EventName_5="0";this.EventName_6="0";this.EventName_7="0";this.EventName_8="0";this.EventName_9="0";this.EventName_10="0";this.EventName_11="0";this.EventName_12="0";this.EventName_13="0";this.EventName_14="0";
  this.backBetPrice_0_1 = '0';this.layBetPrice_0_1 = '0';
  this.backBetPrice_0_2 = '0';this.layBetPrice_0_2 = '0';
  this.backBetPrice_0_3 = '0';this.layBetPrice_0_3 = '0';
  this.backBetPrice_1_1 = '0';this.layBetPrice_1_1 = '0';
  this.backBetPrice_1_2 = '0';this.layBetPrice_1_2 = '0';
  this.backBetPrice_1_3 = '0';this.layBetPrice_1_3 = '0';
  this.backBetPrice_2_1 = '0';this.layBetPrice_2_1 = '0';
  this.backBetPrice_2_2 = '0';this.layBetPrice_2_2 = '0';
  this.backBetPrice_2_3 = '0';this.layBetPrice_2_3 = '0';
  this.backBetPrice_3_1 = '0';this.layBetPrice_3_1 = '0';
  this.backBetPrice_3_2 = '0';this.layBetPrice_3_2 = '0';
  this.backBetPrice_3_3 = '0';this.layBetPrice_3_3 = '0';
  this.backBetPrice_4_1 = '0';this.layBetPrice_4_1 = '0';
  this.backBetPrice_4_2 = '0';this.layBetPrice_4_2 = '0';
  this.backBetPrice_4_3 = '0';this.layBetPrice_4_3 = '0';
  this.backBetPrice_5_1 = '0';this.layBetPrice_5_1 = '0';
  this.backBetPrice_5_2 = '0';this.layBetPrice_5_2 = '0';
  this.backBetPrice_5_3 = '0';this.layBetPrice_5_3 = '0';
  this.backBetPrice_6_1 = '0';this.layBetPrice_6_1 = '0';
  this.backBetPrice_6_2 = '0';this.layBetPrice_6_2 = '0';
  this.backBetPrice_6_3 = '0';this.layBetPrice_6_3 = '0';
  this.backBetPrice_7_1 = '0';this.layBetPrice_7_1 = '0';
  this.backBetPrice_7_2 = '0';this.layBetPrice_7_2 = '0';
  this.backBetPrice_7_3 = '0';this.layBetPrice_7_3 = '0';
  this.backBetPrice_8_1 = '0';this.layBetPrice_8_1 = '0';
  this.backBetPrice_8_2 = '0';this.layBetPrice_8_2 = '0';
  this.backBetPrice_8_3 = '0';this.layBetPrice_8_3 = '0';
  this.backBetPrice_9_1 = '0';this.layBetPrice_9_1 = '0';
  this.backBetPrice_9_2 = '0';this.layBetPrice_9_2 = '0';
  this.backBetPrice_9_3 = '0';this.layBetPrice_9_3 = '0';
  this.backBetPrice_10_1 = '0';this.layBetPrice_10_1 = '0';
  this.backBetPrice_10_2 = '0';this.layBetPrice_10_2 = '0';
  this.backBetPrice_10_3 = '0';this.layBetPrice_10_3 = '0';
  this.backBetPrice_11_1 = '0';this.layBetPrice_11_1 = '0';
  this.backBetPrice_11_2 = '0';this.layBetPrice_11_2 = '0';
  this.backBetPrice_11_3 = '0';this.layBetPrice_11_3 = '0';
  this.backBetPrice_12_1 = '0';this.layBetPrice_12_1 = '0';
  this.backBetPrice_12_2 = '0';this.layBetPrice_12_2 = '0';
  this.backBetPrice_12_3 = '0';this.layBetPrice_12_3 = '0';
  this.backBetPrice_13_1 = '0';this.layBetPrice_13_1 = '0';
  this.backBetPrice_13_2 = '0';this.layBetPrice_13_2 = '0';
  this.backBetPrice_13_3 = '0';this.layBetPrice_13_3 = '0';
  this.backBetPrice_14_1 = '0';this.layBetPrice_14_1 = '0';
  this.backBetPrice_14_2 = '0';this.layBetPrice_14_2 = '0';
  this.backBetPrice_14_3 = '0';this.layBetPrice_14_3 = '0';
  
  this.backBetSize_0_1 = '0';this.layBetSize_0_1 = '0';
  this.backBetSize_0_2 = '0';this.layBetSize_0_2 = '0';
  this.backBetSize_0_3 = '0';this.layBetSize_0_3 = '0';
  this.backBetSize_1_1 = '0';this.layBetSize_1_1 = '0';
  this.backBetSize_1_2 = '0';this.layBetSize_1_2 = '0';
  this.backBetSize_1_3 = '0';this.layBetSize_1_3 = '0';
  this.backBetSize_2_1 = '0';this.layBetSize_2_1 = '0';
  this.backBetSize_2_2 = '0';this.layBetSize_2_2 = '0';
  this.backBetSize_2_3 = '0';this.layBetSize_2_3 = '0';
  this.backBetSize_3_1 = '0';this.layBetSize_3_1 = '0';
  this.backBetSize_3_2 = '0';this.layBetSize_3_2 = '0';
  this.backBetSize_3_3 = '0';this.layBetSize_3_3 = '0';
  this.backBetSize_4_1 = '0';this.layBetSize_4_1 = '0';
  this.backBetSize_4_2 = '0';this.layBetSize_4_2 = '0';
  this.backBetSize_4_3 = '0';this.layBetSize_4_3 = '0';
  this.backBetSize_5_1 = '0';this.layBetSize_5_1 = '0';
  this.backBetSize_5_2 = '0';this.layBetSize_5_2 = '0';
  this.backBetSize_5_3 = '0';this.layBetSize_5_3 = '0';
  this.backBetSize_6_1 = '0';this.layBetSize_6_1 = '0';
  this.backBetSize_6_2 = '0';this.layBetSize_6_2 = '0';
  this.backBetSize_6_3 = '0';this.layBetSize_6_3 = '0';
  this.backBetSize_7_1 = '0';this.layBetSize_7_1 = '0';
  this.backBetSize_7_2 = '0';this.layBetSize_7_2 = '0';
  this.backBetSize_7_3 = '0';this.layBetSize_7_3 = '0';
  this.backBetSize_8_1 = '0';this.layBetSize_8_1 = '0';
  this.backBetSize_8_2 = '0';this.layBetSize_8_2 = '0';
  this.backBetSize_8_3 = '0';this.layBetSize_8_3 = '0';
  this.backBetSize_9_1 = '0';this.layBetSize_9_1 = '0';
  this.backBetSize_9_2 = '0';this.layBetSize_9_2 = '0';
  this.backBetSize_9_3 = '0';this.layBetSize_9_3 = '0';
  this.backBetSize_10_1 = '0';this.layBetSize_10_1 = '0';
  this.backBetSize_10_2 = '0';this.layBetSize_10_2 = '0';
  this.backBetSize_10_3 = '0';this.layBetSize_10_3 = '0';
  this.backBetSize_11_1 = '0';this.layBetSize_11_1 = '0';
  this.backBetSize_11_2 = '0';this.layBetSize_11_2 = '0';
  this.backBetSize_11_3 = '0';this.layBetSize_11_3 = '0';
  this.backBetSize_12_1 = '0';this.layBetSize_12_1 = '0';
  this.backBetSize_12_2 = '0';this.layBetSize_12_2 = '0';
  this.backBetSize_12_3 = '0';this.layBetSize_12_3 = '0';
  this.backBetSize_13_1 = '0';this.layBetSize_13_1 = '0';
  this.backBetSize_13_2 = '0';this.layBetSize_13_2 = '0';
  this.backBetSize_13_3 = '0';this.layBetSize_13_3 = '0';
  this.backBetSize_14_1 = '0';this.layBetSize_14_1 = '0';
  this.backBetSize_14_2 = '0';this.layBetSize_14_2 = '0';
  this.backBetSize_14_3 = '0';this.layBetSize_14_3 = '0';
  this.inPlay_0 = false;this.inPlay_1 = false;this.inPlay_2 = false;this.inPlay_3 = false;this.inPlay_4 = false;this.inPlay_5 = false;this.inPlay_6 = false;this.inPlay_7 = false;this.inPlay_8 = false;this.inPlay_9 = false;this.inPlay_10 = false;this.inPlay_11 = false;this.inPlay_12 = false;this.inPlay_13 = false;
  this.inPlay_14 = false;
  this.EventName_ = 0;
  }
  switchTab(value) {
    //alert(value);
    this.betType =value;
    this.activeTab = value; 
    if(value=='betSlip'){
      this.betSlip = true;
      this.openBets = false;
      this.betONOFF = true;  
    }
    if(value=='openBets'){
      this.betSlip = false;
      this.openBets = true;
      this.betONOFF = false;  
    }     
  }

  addBetSlip(value, price,marketId) {
    //let marketId = this.marketId_0;
    //alert(marketId);
    this.message = "";
    this.isActive = false;
    if(price<=0)
      this.price = '';
    else
      this.price = price;
    console.log("value=="+value);    
    if(value=="back"){
      this.Back = true;
      this.Lay = false;
    }
    if(value=="lay"){
      this.Back = false;
      this.Lay = true;
    }   
    this.inPlay = "false";
    this.MarketID = marketId;
    this.selectionId = "0";
    this.liability = "0.00";
    this.profit = "0.00";
    this.matchId = "0";
    this.runnerId = "0";
    this.betType = value;
  }

  onFocusEvent(event) { 
    this.stateFocus = true;
  }

  onFocusOutEvent(event) {
    this.stateFocus = false;
  }

  addStake(stakeValue,event) {    
    event.preventDefault();
    if(stakeValue=='max'){
      this.stateFocus = true;
      this.stake = this.availableCredit;
    }else if(stakeValue=='0'){
      this.stateFocus = false;
      this.stake = "";
    }else{
      this.stateFocus = true;
      this.stake = stakeValue;
    }
  }

  getMatches(matches) {
    this.alive = false;
    this.mainTable = true;
    this.subTable = false;
    this.alive1 = false;    
    this.eventHeader = matches;
    if(matches=="Football")
        matches = "Soccer";     
    this.alive1 = true;    
    this.sizeDisplay = true;
    this.blankVariables(); 
    this.alive1 = true;  
    let i = 0;
    let j = 0;
    Observable.timer(0,300)
      .takeWhile(() => this.alive1) // only fires when component is alive
      .subscribe(() => {
      this.eventNameArr = [];      
      //alert(this.alive1);
      this.http.get('http://pragati777.com/AllOpenMarketIDs').subscribe((data:any) => {      
            //console.log("data length=="+data.length+"====match===="+matches);
          //if(data.length>0){
            
           if(data[0].EventTypeName===matches){
                this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[0].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                  //console.log("inPlayData=="+JSON.stringify(inPlayData));                  
                  if(inPlayData!=null){
                    this.marketId_0 = inPlayData.marketId;
                    if(inPlayData.numberOfActiveRunners=="1"){
                      this.backBetPrice_0_1 = inPlayData.runners[0].back[0].price;
                      this.layBetPrice_0_1 = inPlayData.runners[0].lay[0].price;
                      this.backBetPrice_0_2 = "-";
                      this.layBetPrice_0_2 = "-";
                      this.backBetPrice_0_3 = '-';
                      this.layBetPrice_0_3 = '-';
                      
                      this.backBetSize_0_1 = inPlayData.runners[0].back[0].size;
                      this.layBetSize_0_1 = inPlayData.runners[0].lay[0].size;
                      this.backBetSize_0_2 = "-";
                      this.layBetSize_0_2 = "-";
                      this.backBetSize_0_3 = '-';
                      this.layBetSize_0_3 = '-';
                    }
                    if(inPlayData.numberOfActiveRunners=="2"){
                      this.backBetPrice_0_1 = inPlayData.runners[0].back[0].price;
                      this.layBetPrice_0_1 = inPlayData.runners[0].lay[0].price;
                      this.backBetPrice_0_2 = '-';
                      this.layBetPrice_0_2 = '-';
                      this.backBetPrice_0_3 = inPlayData.runners[1].back[0].price;
                      this.layBetPrice_0_3 = inPlayData.runners[1].lay[0].price;  

                      this.backBetSize_0_1 = inPlayData.runners[0].back[0].size;
                      this.layBetSize_0_1 = inPlayData.runners[0].lay[0].size;
                      this.backBetSize_0_2 = '-';
                      this.layBetSize_0_2 = '-';
                      this.backBetSize_0_3 = inPlayData.runners[1].back[0].size;
                      this.layBetSize_0_3 = inPlayData.runners[1].lay[0].size;  
                    }
                    if(inPlayData.numberOfActiveRunners=="3"){
                      this.backBetPrice_0_1 = inPlayData.runners[0].back[0].price;
                      this.layBetPrice_0_1 = inPlayData.runners[0].lay[0].price;
                      this.backBetPrice_0_2 = inPlayData.runners[2].back[0].price;
                      this.layBetPrice_0_2 = inPlayData.runners[2].lay[0].price;
                      this.backBetPrice_0_3 = inPlayData.runners[1].back[0].price;
                      this.layBetPrice_0_3 = inPlayData.runners[1].lay[0].price;
                      
                      this.backBetSize_0_1 = inPlayData.runners[0].back[0].size;
                      this.layBetSize_0_1 = inPlayData.runners[0].lay[0].size;
                      this.backBetSize_0_2 = inPlayData.runners[2].back[0].size;
                      this.layBetSize_0_2 = inPlayData.runners[2].lay[0].size;
                      this.backBetSize_0_3 = inPlayData.runners[1].back[0].size;
                      this.layBetSize_0_3 = inPlayData.runners[1].lay[0].size;
                    }
                    this.inPlay_0 = data[0].inPlay;
                  }
                });
                this.EventName_0 = data[0].EventName;                
              }else{
                this.EventName_0 = "0";
              }
            /////}
          //if(data.length>1){
              if(data[1].EventTypeName===matches){  
                this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[1].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                  if(inPlayData!=null){
                    this.marketId_1 = inPlayData.marketId;
                    if(inPlayData.numberOfActiveRunners=="1"){
                      this.backBetPrice_1_1 = inPlayData.runners[0].back[0].price;
                      this.layBetPrice_1_1 = inPlayData.runners[0].lay[0].price;
                      this.backBetPrice_1_2 = "-";
                      this.layBetPrice_1_2 = "-";
                      this.backBetPrice_1_3 = '-';
                      this.layBetPrice_1_3 = '-';  
                      
                      this.backBetSize_1_1 = inPlayData.runners[0].back[0].size;
                      this.layBetSize_1_1 = inPlayData.runners[0].lay[0].size;
                      this.backBetSize_1_2 = "-";
                      this.layBetSize_1_2 = "-";
                      this.backBetSize_1_3 = '-';
                      this.layBetSize_1_3 = '-';  
                    }
                    if(inPlayData.numberOfActiveRunners=="2"){
                      this.backBetPrice_1_1 = inPlayData.runners[0].back[0].price;
                      this.layBetPrice_1_1 = inPlayData.runners[0].lay[0].price;
                      this.backBetPrice_1_2 = '-';
                      this.layBetPrice_1_2 = '-';
                      this.backBetPrice_1_3 = inPlayData.runners[1].back[0].price;
                      this.layBetPrice_1_3 = inPlayData.runners[1].lay[0].price; 
                      
                      this.backBetSize_1_1 = inPlayData.runners[0].back[0].size;
                      this.layBetSize_1_1 = inPlayData.runners[0].lay[0].size;
                      this.backBetSize_1_2 = '-';
                      this.layBetSize_1_2 = '-';
                      this.backBetSize_1_3 = inPlayData.runners[1].back[0].size;
                      this.layBetSize_1_3 = inPlayData.runners[1].lay[0].size; 
                    }
                    if(inPlayData.numberOfActiveRunners=="3"){
                      this.backBetPrice_1_1 = inPlayData.runners[0].back[0].price;
                      this.layBetPrice_1_1 = inPlayData.runners[0].lay[0].price;
                      this.backBetPrice_1_2 = inPlayData.runners[2].back[0].price;
                      this.layBetPrice_1_2 = inPlayData.runners[2].lay[0].price;
                      this.backBetPrice_1_3 = inPlayData.runners[1].back[0].price;
                      this.layBetPrice_1_3 = inPlayData.runners[1].lay[0].price; 
                      
                      this.backBetSize_1_1 = inPlayData.runners[0].back[0].size;
                      this.layBetSize_1_1 = inPlayData.runners[0].lay[0].size;
                      this.backBetSize_1_2 = inPlayData.runners[2].back[0].size;
                      this.layBetSize_1_2 = inPlayData.runners[2].lay[0].size;
                      this.backBetSize_1_3 = inPlayData.runners[1].back[0].size;
                      this.layBetSize_1_3 = inPlayData.runners[1].lay[0].size; 
                    }
                    this.inPlay_1 = data[1].inPlay;
                  }
                });
                this.EventName_1 = data[1].EventName;                
              }else{
                this.EventName_1 = "0";
              }
           // }
         // if(data.length>2){
              if(data[2].EventTypeName===matches){
                this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[2].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                  if(inPlayData!=null){
                  this.marketId_2 = inPlayData.marketId;
                    if(inPlayData.numberOfActiveRunners=="1"){
                      this.backBetPrice_2_1 = inPlayData.runners[0].back[0].price;
                      this.layBetPrice_2_1 = inPlayData.runners[0].lay[0].price;
                      this.backBetPrice_2_2 = "-";
                      this.layBetPrice_2_2 = "-";
                      this.backBetPrice_2_3 = '-';
                      this.layBetPrice_2_3 = '-'; 
                      
                      this.backBetSize_2_1 = inPlayData.runners[0].back[0].size;
                      this.layBetSize_2_1 = inPlayData.runners[0].lay[0].size;
                      this.backBetSize_2_2 = "-";
                      this.layBetSize_2_2 = "-";
                      this.backBetSize_2_3 = '-';
                      this.layBetSize_2_3 = '-'; 
                    }
                    if(inPlayData.numberOfActiveRunners=="2"){
                      this.backBetPrice_2_1 = inPlayData.runners[0].back[0].price;
                      this.layBetPrice_2_1 = inPlayData.runners[0].lay[0].price;
                      this.backBetPrice_2_2 = '-';
                      this.layBetPrice_2_2 = '-';
                      this.backBetPrice_2_3 = inPlayData.runners[1].back[0].price;
                      this.layBetPrice_2_3 = inPlayData.runners[1].lay[0].price;  

                      this.backBetSize_2_1 = inPlayData.runners[0].back[0].size;
                      this.layBetSize_2_1 = inPlayData.runners[0].lay[0].size;
                      this.backBetSize_2_2 = '-';
                      this.layBetSize_2_2 = '-';
                      this.backBetSize_2_3 = inPlayData.runners[1].back[0].size;
                      this.layBetSize_2_3 = inPlayData.runners[1].lay[0].size;  
                    }
                    if(inPlayData.numberOfActiveRunners=="3"){
                      this.backBetPrice_2_1 = inPlayData.runners[0].back[0].price;
                      this.layBetPrice_2_1 = inPlayData.runners[0].lay[0].price;
                      this.backBetPrice_2_2 = inPlayData.runners[2].back[0].price;
                      this.layBetPrice_2_2 = inPlayData.runners[2].lay[0].price;
                      this.backBetPrice_2_3 = inPlayData.runners[1].back[0].price;
                      this.layBetPrice_2_3 = inPlayData.runners[1].lay[0].price;  

                      this.backBetSize_2_1 = inPlayData.runners[0].back[0].size;
                      this.layBetSize_2_1 = inPlayData.runners[0].lay[0].size;
                      this.backBetSize_2_2 = inPlayData.runners[2].back[0].size;
                      this.layBetSize_2_2 = inPlayData.runners[2].lay[0].size;
                      this.backBetSize_2_3 = inPlayData.runners[1].back[0].size;
                      this.layBetSize_2_3 = inPlayData.runners[1].lay[0].size;  
                    }
                    this.inPlay_2 = data[2].inPlay;
                  }
                });
                this.EventName_2 = data[2].EventName;
                
              }else{
                this.EventName_2 = "0";
              }
           // }
          //if(data.length>3){
            if(data[3].EventTypeName===matches){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[3].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                if(inPlayData!=null){
                  this.marketId_3 = inPlayData.marketId;
                  if(inPlayData.numberOfActiveRunners=="1"){
                    this.backBetPrice_3_1 = inPlayData.runners[0].back[0].price;
                    this.layBetPrice_3_1 = inPlayData.runners[0].lay[0].price;
                    this.backBetPrice_3_2 = "-";
                    this.layBetPrice_3_2 = "-";
                    this.backBetPrice_3_3 = '-';
                    this.layBetPrice_3_3 = '-';  

                    this.backBetSize_3_1 = inPlayData.runners[0].back[0].size;
                    this.layBetSize_3_1 = inPlayData.runners[0].lay[0].size;
                    this.backBetSize_3_2 = "-";
                    this.layBetSize_3_2 = "-";
                    this.backBetSize_3_3 = '-';
                    this.layBetSize_3_3 = '-';  
                  }
                  if(inPlayData.numberOfActiveRunners=="2"){
                    this.backBetPrice_3_1 = inPlayData.runners[0].back[0].price;
                    this.layBetPrice_3_1 = inPlayData.runners[0].lay[0].price;
                    this.backBetPrice_3_2 = '-';
                    this.layBetPrice_3_2 = '-';
                    this.backBetPrice_3_3 = inPlayData.runners[1].back[0].price;
                    this.layBetPrice_3_3 = inPlayData.runners[1].lay[0].price;  

                    this.backBetSize_3_1 = inPlayData.runners[0].back[0].size;
                    this.layBetSize_3_1 = inPlayData.runners[0].lay[0].size;
                    this.backBetSize_3_2 = '-';
                    this.layBetSize_3_2 = '-';
                    this.backBetSize_3_3 = inPlayData.runners[1].back[0].size;
                    this.layBetSize_3_3 = inPlayData.runners[1].lay[0].size;  
                  }
                  if(inPlayData.numberOfActiveRunners=="3"){
                    this.backBetPrice_3_1 = inPlayData.runners[0].back[0].price;
                    this.layBetPrice_3_1 = inPlayData.runners[0].lay[0].price;
                    this.backBetPrice_3_2 = inPlayData.runners[2].back[0].price;
                    this.layBetPrice_3_2 = inPlayData.runners[2].lay[0].price;
                    this.backBetPrice_3_3 = inPlayData.runners[1].back[0].price;
                    this.layBetPrice_3_3 = inPlayData.runners[1].lay[0].price; 
                    
                    this.backBetSize_3_1 = inPlayData.runners[0].back[0].size;
                    this.layBetSize_3_1 = inPlayData.runners[0].lay[0].size;
                    this.backBetSize_3_2 = inPlayData.runners[2].back[0].size;
                    this.layBetSize_3_2 = inPlayData.runners[2].lay[0].size;
                    this.backBetSize_3_3 = inPlayData.runners[1].back[0].size;
                    this.layBetSize_3_3 = inPlayData.runners[1].lay[0].size; 
                  }
                  this.inPlay_3 = data[3].inPlay;
                }
              });
              this.EventName_3 = data[3].EventName;
            }else{
              this.EventName_3 = "0";
            }
          //}
          //if(data.length>4){
            if(data[4].EventTypeName===matches){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[4].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                if(inPlayData!=null){
                  this.marketId_4 = inPlayData.marketId;
                  if(inPlayData.numberOfActiveRunners=="1"){
                    this.backBetPrice_4_1 = inPlayData.runners[0].back[0].price;
                    this.layBetPrice_4_1 = inPlayData.runners[0].lay[0].price;
                    this.backBetPrice_4_2 = "-";
                    this.layBetPrice_4_2 = "-";
                    this.backBetPrice_4_3 = '-';
                    this.layBetPrice_4_3 = '-'; 
                    
                    this.backBetSize_4_1 = inPlayData.runners[0].back[0].size;
                    this.layBetSize_4_1 = inPlayData.runners[0].lay[0].size;
                    this.backBetSize_4_2 = "-";
                    this.layBetSize_4_2 = "-";
                    this.backBetSize_4_3 = '-';
                    this.layBetSize_4_3 = '-'; 
                  }
                  if(inPlayData.numberOfActiveRunners=="2"){
                    this.backBetPrice_4_1 = inPlayData.runners[0].back[0].price;
                    this.layBetPrice_4_1 = inPlayData.runners[0].lay[0].price;
                    this.backBetPrice_4_2 = '-';
                    this.layBetPrice_4_2 = '-';
                    this.backBetPrice_4_3 = inPlayData.runners[1].back[0].price;
                    this.layBetPrice_4_3 = inPlayData.runners[1].lay[0].price;  

                    this.backBetSize_4_1 = inPlayData.runners[0].back[0].size;
                    this.layBetSize_4_1 = inPlayData.runners[0].lay[0].size;
                    this.backBetSize_4_2 = '-';
                    this.layBetSize_4_2 = '-';
                    this.backBetSize_4_3 = inPlayData.runners[1].back[0].size;
                    this.layBetSize_4_3 = inPlayData.runners[1].lay[0].size;  
                  }
                  if(inPlayData.numberOfActiveRunners=="3"){
                    this.backBetPrice_4_1 = inPlayData.runners[0].back[0].price;
                    this.layBetPrice_4_1 = inPlayData.runners[0].lay[0].price;
                    this.backBetPrice_4_2 = inPlayData.runners[2].back[0].price;
                    this.layBetPrice_4_2 = inPlayData.runners[2].lay[0].price;
                    this.backBetPrice_4_3 = inPlayData.runners[1].back[0].price;
                    this.layBetPrice_4_3 = inPlayData.runners[1].lay[0].price;
                    
                    this.backBetSize_4_1 = inPlayData.runners[0].back[0].size;
                    this.layBetSize_4_1 = inPlayData.runners[0].lay[0].size;
                    this.backBetSize_4_2 = inPlayData.runners[2].back[0].size;
                    this.layBetSize_4_2 = inPlayData.runners[2].lay[0].size;
                    this.backBetSize_4_3 = inPlayData.runners[1].back[0].size;
                    this.layBetSize_4_3 = inPlayData.runners[1].lay[0].size;
                  }
                  this.inPlay_4 = data[4].inPlay;
                }
              });
              this.EventName_4 = data[4].EventName;
            }else{
              this.EventName_4 = "0";
            }
          //}
          //if(data.length>5){
            if(data[5].EventTypeName===matches){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[5].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_5 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_5_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_5_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_5_2 = "-";
                  this.layBetPrice_5_2 = "-";
                  this.backBetPrice_5_3 = '-';
                  this.layBetPrice_5_3 = '-'; 
                  
                  this.backBetSize_5_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_5_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_5_2 = "-";
                  this.layBetSize_5_2 = "-";
                  this.backBetSize_5_3 = '-';
                  this.layBetSize_5_3 = '-'; 
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_5_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_5_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_5_2 = '-';
                  this.layBetPrice_5_2 = '-';
                  this.backBetPrice_5_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_5_3 = inPlayData.runners[1].lay[0].price;
                  
                  this.backBetSize_5_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_5_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_5_2 = '-';
                  this.layBetSize_5_2 = '-';
                  this.backBetSize_5_3 = inPlayData.runners[1].back[0].size;
                  this.layBetSize_5_3 = inPlayData.runners[1].lay[0].size;
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_5_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_5_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_5_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_5_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_5_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_5_3 = inPlayData.runners[1].lay[0].price;  

                  this.backBetSize_5_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_5_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_5_2 = inPlayData.runners[2].back[0].size;
                  this.layBetSize_5_2 = inPlayData.runners[2].lay[0].size;
                  this.backBetSize_5_3 = inPlayData.runners[1].back[0].size;
                  this.layBetSize_5_3 = inPlayData.runners[1].lay[0].size;  
                }
                this.inPlay_5 = data[5].inPlay;
              });
              this.EventName_5 = data[5].EventName;
            }else{
              this.EventName_5 = "0";
            }
          //}
          //if(data.length>6){
            if(data[6].EventTypeName===matches){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[6].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_6 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_6_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_6_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_6_2 = "-";
                  this.layBetPrice_6_2 = "-";
                  this.backBetPrice_6_3 = '-';
                  this.layBetPrice_6_3 = '-';  

                  this.backBetSize_6_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_6_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_6_2 = "-";
                  this.layBetSize_6_2 = "-";
                  this.backBetSize_6_3 = '-';
                  this.layBetSize_6_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_6_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_6_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_6_2 = '-';
                  this.layBetPrice_6_2 = '-';
                  this.backBetPrice_6_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_6_3 = inPlayData.runners[1].lay[0].price;
                  
                  this.backBetSize_6_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_6_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_6_2 = '-';
                  this.layBetSize_6_2 = '-';
                  this.backBetSize_6_3 = inPlayData.runners[1].back[0].size;
                  this.layBetSize_6_3 = inPlayData.runners[1].lay[0].size;
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_6_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_6_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_6_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_6_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_6_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_6_3 = inPlayData.runners[1].lay[0].price;  

                  this.backBetSize_6_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_6_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_6_2 = inPlayData.runners[2].back[0].size;
                  this.layBetSize_6_2 = inPlayData.runners[2].lay[0].size;
                  this.backBetSize_6_3 = inPlayData.runners[1].back[0].size;
                  this.layBetSize_6_3 = inPlayData.runners[1].lay[0].size;  
                }
                this.inPlay_6 = data[6].inPlay;
              });
              this.EventName_6 = data[6].EventName;      
            }else{
              this.EventName_6 = "0";
            }
         // }
          //if(data.length>7){
            if(data[7].EventTypeName===matches){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[7].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_7 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_7_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_7_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_7_2 = "-";
                  this.layBetPrice_7_2 = "-";
                  this.backBetPrice_7_3 = '-';
                  this.layBetPrice_7_3 = '-';
                  
                  this.backBetSize_7_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_7_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_7_2 = "-";
                  this.layBetSize_7_2 = "-";
                  this.backBetSize_7_3 = '-';
                  this.layBetSize_7_3 = '-';
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_7_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_7_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_7_2 = '-';
                  this.layBetPrice_7_2 = '-';
                  this.backBetPrice_7_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_7_3 = inPlayData.runners[1].lay[0].price; 
                  
                  this.backBetSize_7_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_7_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_7_2 = '-';
                  this.layBetSize_7_2 = '-';
                  this.backBetSize_7_3 = inPlayData.runners[1].back[0].size;
                  this.layBetSize_7_3 = inPlayData.runners[1].lay[0].size; 
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_7_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_7_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_7_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_7_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_7_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_7_3 = inPlayData.runners[1].lay[0].price;
                  
                  this.backBetSize_7_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_7_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_7_2 = inPlayData.runners[2].back[0].size;
                  this.layBetSize_7_2 = inPlayData.runners[2].lay[0].size;
                  this.backBetSize_7_3 = inPlayData.runners[1].back[0].size;
                  this.layBetSize_7_3 = inPlayData.runners[1].lay[0].size;
                }
                this.inPlay_7 = data[7].inPlay;
              });  
              this.EventName_7 = data[7].EventName;
              console.log("EventName_7======"+this.EventName_7);              

            }else{
              this.EventName_7 = "0";
            }
          //}
          //if(data.length>8){
            if(data[8].EventTypeName===matches){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[8].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_8 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_8_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_8_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_8_2 = "-";
                  this.layBetPrice_8_2 = "-";
                  this.backBetPrice_8_3 = '-';
                  this.layBetPrice_8_3 = '-';
                  
                  this.backBetSize_8_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_8_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_8_2 = "-";
                  this.layBetSize_8_2 = "-";
                  this.backBetSize_8_3 = '-';
                  this.layBetSize_8_3 = '-';
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_8_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_8_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_8_2 = '-';
                  this.layBetPrice_8_2 = '-';
                  this.backBetPrice_8_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_8_3 = inPlayData.runners[1].lay[0].price;
                  
                  this.backBetSize_8_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_8_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_8_2 = '-';
                  this.layBetSize_8_2 = '-';
                  this.backBetSize_8_3 = inPlayData.runners[1].back[0].size;
                  this.layBetSize_8_3 = inPlayData.runners[1].lay[0].size;
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_8_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_8_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_8_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_8_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_8_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_8_3 = inPlayData.runners[1].lay[0].price; 
                  
                  this.backBetSize_8_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_8_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_8_2 = inPlayData.runners[2].back[0].size;
                  this.layBetSize_8_2 = inPlayData.runners[2].lay[0].size;
                  this.backBetSize_8_3 = inPlayData.runners[1].back[0].size;
                  this.layBetSize_8_3 = inPlayData.runners[1].lay[0].size; 
                }
                this.inPlay_8 = data[8].inPlay;
              });   
              this.EventName_8 = data[8].EventName;
            }else{
              this.EventName_8 = "0";
            }
          //}
          //if(data.length>9){
            if(data[9].EventTypeName===matches){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[9].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_9 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_9_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_9_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_9_2 = "-";
                  this.layBetPrice_9_2 = "-";
                  this.backBetPrice_9_3 = '-';
                  this.layBetPrice_9_3 = '-';  

                  this.backBetSize_9_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_9_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_9_2 = "-";
                  this.layBetSize_9_2 = "-";
                  this.backBetSize_9_3 = '-';
                  this.layBetSize_9_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_9_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_9_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_9_2 = '-';
                  this.layBetPrice_9_2 = '-';
                  this.backBetPrice_9_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_9_3 = inPlayData.runners[1].lay[0].price; 
                  
                  this.backBetSize_9_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_9_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_9_2 = '-';
                  this.layBetSize_9_2 = '-';
                  this.backBetSize_9_3 = inPlayData.runners[1].back[0].size;
                  this.layBetSize_9_3 = inPlayData.runners[1].lay[0].size; 
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_9_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_9_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_9_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_9_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_9_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_9_3 = inPlayData.runners[1].lay[0].price; 
                  
                  this.backBetSize_9_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_9_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_9_2 = inPlayData.runners[2].back[0].size;
                  this.layBetSize_9_2 = inPlayData.runners[2].lay[0].size;
                  this.backBetSize_9_3 = inPlayData.runners[1].back[0].size;
                  this.layBetSize_9_3 = inPlayData.runners[1].lay[0].size; 
                }
                this.inPlay_9 = data[9].inPlay;
              });
              this.EventName_9 = data[9].EventName;
            }else{
              this.EventName_9 = "0";
            }
          //}
          //if(data.length>10){
            if(data[10].EventTypeName===matches){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[10].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_10 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_10_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_10_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_10_2 = "-";
                  this.layBetPrice_10_2 = "-";
                  this.backBetPrice_10_3 = '-';
                  this.layBetPrice_10_3 = '-';
                  
                  this.backBetSize_10_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_10_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_10_2 = "-";
                  this.layBetSize_10_2 = "-";
                  this.backBetSize_10_3 = '-';
                  this.layBetSize_10_3 = '-';
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_10_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_10_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_10_2 = '-';
                  this.layBetPrice_10_2 = '-';
                  this.backBetPrice_10_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_10_3 = inPlayData.runners[1].lay[0].price;
                  
                  this.backBetSize_10_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_10_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_10_2 = '-';
                  this.layBetSize_10_2 = '-';
                  this.backBetSize_10_3 = inPlayData.runners[1].back[0].size;
                  this.layBetSize_10_3 = inPlayData.runners[1].lay[0].size;
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_10_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_10_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_10_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_10_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_10_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_10_3 = inPlayData.runners[1].lay[0].price;
                  
                  this.backBetSize_10_1 = inPlayData.runners[0].back[0].size;
                  this.layBetSize_10_1 = inPlayData.runners[0].lay[0].size;
                  this.backBetSize_10_2 = inPlayData.runners[2].back[0].size;
                  this.layBetSize_10_2 = inPlayData.runners[2].lay[0].size;
                  this.backBetSize_10_3 = inPlayData.runners[1].back[0].size;
                  this.layBetSize_10_3 = inPlayData.runners[1].lay[0].size;
                }
                this.inPlay_9 = data[9].inPlay;
              }); 
              this.EventName_10 = data[10].EventName;
            }else{
              this.EventName_10 = "0";
            }
         // }
          //if(data.length>11){
            if(data[11].EventTypeName===matches){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[11].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_11 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_11_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_11_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_11_2 = "-";
                  this.layBetPrice_11_2 = "-";
                  this.backBetPrice_11_3 = '-';
                  this.layBetPrice_11_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_11_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_11_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_11_2 = '-';
                  this.layBetPrice_11_2 = '-';
                  this.backBetPrice_11_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_11_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_11_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_11_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_11_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_11_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_11_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_11_3 = inPlayData.runners[1].lay[0].price;  
                }
              }); 
              this.inPlay_11 = data[11].EventName;
            }else{
              this.EventName_11 = "0";
            }
         // }
         // if(data.length>12){
            if(data[12].EventTypeName===matches){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[12].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_12 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_12_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_12_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_12_2 = "-";
                  this.layBetPrice_12_2 = "-";
                  this.backBetPrice_12_3 = '-';
                  this.layBetPrice_12_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_12_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_12_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_12_2 = '-';
                  this.layBetPrice_12_2 = '-';
                  this.backBetPrice_12_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_12_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_12_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_12_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_12_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_12_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_12_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_12_3 = inPlayData.runners[1].lay[0].price;  
                }
              });  
              this.inPlay_12 = data[12].EventName;      
            }else{
              this.EventName_12 = "0";
            }
          //}
          //if(data.length>13){
            if(data[13].EventTypeName===matches){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[13].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_13 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_13_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_13_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_13_2 = "-";
                  this.layBetPrice_13_2 = "-";
                  this.backBetPrice_13_3 = '-';
                  this.layBetPrice_13_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_13_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_13_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_13_2 = '-';
                  this.layBetPrice_13_2 = '-';
                  this.backBetPrice_13_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_13_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_13_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_13_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_13_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_13_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_13_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_13_3 = inPlayData.runners[1].lay[0].price;  
                }
              });  
              this.inPlay_13 = data[13].EventName;
            }else{
              this.EventName_13 = "0";
            }
         // }
         // if(data.length>14){
            if(data[14].EventTypeName===matches){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[14].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_14 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_14_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_14_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_14_2 = "-";
                  this.layBetPrice_14_2 = "-";
                  this.backBetPrice_14_3 = '-';
                  this.layBetPrice_14_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_14_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_14_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_14_2 = '-';
                  this.layBetPrice_14_2 = '-';
                  this.backBetPrice_14_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_14_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_14_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_14_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_14_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_14_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_14_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_14_3 = inPlayData.runners[1].lay[0].price;  
                }
              }); 
              this.inPlay_14 = data[14].EventName;
            }else{
              this.EventName_14 = "0";
            }
          //}

      });
      i++;
    });
  }

  getMatcheDetails(matchId) {
    alert(matchId);
    this.alive = false;
    this.mainTable = true;
    this.subTable = false;
    this.alive1 = false;    
    //this.eventHeader = matches;
    
    this.alive1 = true;    
    this.sizeDisplay = true;
    this.blankVariables(); 
    this.alive1 = true;  
    let i = 0;
    let j = 0;
    // Observable.timer(0,300)
    //   .takeWhile(() => this.alive1) // only fires when component is alive
    //   .subscribe(() => {
      this.eventNameArr = [];   
        this.http.get('http://115.124.103.128:5105/getFeed?mid='+matchId+'&type=odds').subscribe((inPlayData:any) => {
          console.log("get match details=="+JSON.stringify(inPlayData));                  
          if(inPlayData!=null){
            //this.marketId_0 = inPlayData.marketId;
            
          }
        });          
      i++;
    //});
  }
  
  getOneClickStatus(e) {
    //alert(e.target.checked);
    this.oneClickStatus = e.target.checked;;
    localStorage.setItem("oneClickStatus",e.target.checked); 
  }

  getBetConfrimation(e) {
    this.betConfrimation = e.target.checked;;
    localStorage.setItem("betConfrimation",e.target.checked); 
  }
  get f() {return this.betSlipForm.controls}

  onSubmit(betData) {
    this.betSlipError = false;
    console.log("betData==="+JSON.stringify(betData));    
    let form_data: any = Object.assign(this.betSlipForm.value);
    console.log("user==="+JSON.stringify(form_data));    
    //this.spinner.show();
    if (this.betSlipForm.invalid) {
      this.betSlipError = true;
        return;
    }
    //return;
    //this.spinner.hide();
    this.timersDivStatus = true;
    //this.confrimationMsgStatus = true;
   // return;
    this.counter = 5;
    var interval = setInterval(() => {
      console.log(this.counter);
      this.counter--;    
      if(this.counter < 0 ){
        this.timersDivStatus = false;
        clearInterval(interval);
        console.log('Ding!');
        let data: any = Object.assign(this.betSlipForm.value);
        this.fileuploadservice.addBetSlip(data).subscribe(
          data=>{  
            this.betSlipError = false;
            console.log("Success");
            console.log("add bet slip data===="+JSON.stringify(data));
            //this.spinner.hide();
            this.message = "Bet added successfuly!";
            setTimeout (() => {
                this.message ="";
            }, 3000);
            this.price = "";
            this.stake = "";
          },
            error=>{
              //this.spinner.hide();
              this.betSlipError = true;
              console.log("Bet slip adding fail");
              console.log(error);
              this.message = "Bet not added!";
              this.addBetSlipResult="Bet slip adding fail. Please try again";
            });
      };
    }, 1000);
    
    
  }
  ngOnInit() {
    this.mainTable = true;
    this.betSlipForm = this.formBuilder.group({
      stake: ['',[Validators.required]],
      odds: ['',[Validators.required]],
      oneClick: ['',[]],
      marketId:['',[]],
      matchId:['',[]],
      inPlay:['',[]],
      betType:['',[]],
      createdBy:['',[]],
      betConfirm:['',[]],
      liability:['',[]],
      runnerId:['',[]],
      profit:['',[]],
      userId:['',[]],
    });
    let loclOneClckSts = localStorage.getItem("oneClickStatus");
    if(loclOneClckSts!="" && loclOneClckSts!=null){
      let checkS = localStorage.getItem("oneClickStatus");
      this.oneClickStatus = JSON.parse(checkS);
    }
    let betConfrm = localStorage.getItem("betConfrimation");
    if(betConfrm!="" && betConfrm!=null){
      let checkS = localStorage.getItem("betConfrimation");
      this.betConfrimation = JSON.parse(checkS);
    }
    this.eventHeader = "Cricket";
    //this.oneClickStatus = value; 
    this.sizeDisplay = false;
      // Observable.timer(0,5000)
      // .takeWhile(() => this.alive) // only fires when component is alive
      // .subscribe(() => {
      this.eventNameArr = [];
      this.http.get('http://pragati777.com/AllOpenMarketIDs').subscribe((data:any) => {        
        if(data.length>0){
            if(data[0].EventTypeName=="Cricket"){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[0].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_0 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_0_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_0_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_0_2 = "-";
                  this.layBetPrice_0_2 = "-";
                  this.backBetPrice_0_3 = '-';
                  this.layBetPrice_0_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_0_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_0_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_0_2 = '-';
                  this.layBetPrice_0_2 = '-';
                  this.backBetPrice_0_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_0_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_0_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_0_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_0_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_0_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_0_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_0_3 = inPlayData.runners[1].lay[0].price;  
                }
              });
              this.EventName_0 = data[0].EventName;
              this.inPlay_0 = data[0].EventName;
            }        
          }
          if(data.length>1){
            if(data[1].EventTypeName=="Cricket"){  
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[1].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_1 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_1_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_1_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_1_2 = "-";
                  this.layBetPrice_1_2 = "-";
                  this.backBetPrice_1_3 = '-';
                  this.layBetPrice_1_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_1_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_1_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_1_2 = '-';
                  this.layBetPrice_1_2 = '-';
                  this.backBetPrice_1_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_1_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_1_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_1_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_1_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_1_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_1_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_1_3 = inPlayData.runners[1].lay[0].price;  
                }
              });
              this.EventName_1 = data[1].EventName;
            }
          }
          if(data.length>2){
            if(data[2].EventTypeName=="Cricket"){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[2].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_2 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_2_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_2_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_2_2 = "-";
                  this.layBetPrice_2_2 = "-";
                  this.backBetPrice_2_3 = '-';
                  this.layBetPrice_2_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_2_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_2_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_2_2 = '-';
                  this.layBetPrice_2_2 = '-';
                  this.backBetPrice_2_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_2_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_2_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_2_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_2_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_2_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_2_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_2_3 = inPlayData.runners[1].lay[0].price;  
                }
              });
              this.EventName_2 = data[2].EventName;
            }
          }
          if(data.length>3){  
            if(data[3].EventTypeName=="Cricket"){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[3].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_3 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_3_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_3_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_3_2 = "-";
                  this.layBetPrice_3_2 = "-";
                  this.backBetPrice_3_3 = '-';
                  this.layBetPrice_3_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_3_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_3_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_3_2 = '-';
                  this.layBetPrice_3_2 = '-';
                  this.backBetPrice_3_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_3_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_3_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_3_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_3_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_3_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_3_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_3_3 = inPlayData.runners[1].lay[0].price;  
                }
              });
              this.EventName_3 = data[3].EventName;
            }
          }
          if(data.length>4){  
            if(data[4].EventTypeName=="Cricket"){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[4].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_4 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_4_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_4_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_4_2 = "-";
                  this.layBetPrice_4_2 = "-";
                  this.backBetPrice_4_3 = '-';
                  this.layBetPrice_4_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_4_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_4_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_4_2 = '-';
                  this.layBetPrice_4_2 = '-';
                  this.backBetPrice_4_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_4_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_4_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_4_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_4_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_4_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_4_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_4_3 = inPlayData.runners[1].lay[0].price;  
                }
              });
              this.EventName_4 = data[4].EventName;
            }
          }
          if(data.length>5){  
            if(data[5].EventTypeName=="Cricket"){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[5].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_5 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_5_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_5_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_5_2 = "-";
                  this.layBetPrice_5_2 = "-";
                  this.backBetPrice_5_3 = '-';
                  this.layBetPrice_5_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_5_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_5_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_5_2 = '-';
                  this.layBetPrice_5_2 = '-';
                  this.backBetPrice_5_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_5_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_5_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_5_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_5_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_5_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_5_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_5_3 = inPlayData.runners[1].lay[0].price;  
                }
              });
              this.EventName_5 = data[5].EventName;
            }
          }
          if(data.length>6){  
            if(data[6].EventTypeName=="Cricket"){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[6].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_6 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_6_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_6_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_6_2 = "-";
                  this.layBetPrice_6_2 = "-";
                  this.backBetPrice_6_3 = '-';
                  this.layBetPrice_6_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_6_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_6_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_6_2 = '-';
                  this.layBetPrice_6_2 = '-';
                  this.backBetPrice_6_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_6_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_6_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_6_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_6_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_6_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_6_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_6_3 = inPlayData.runners[1].lay[0].price;  
                }
              });
              this.EventName_6 = data[6].EventName;      
            }
          }
          if(data.length>7){  
            if(data[7].EventTypeName=="Cricket"){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[7].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_7 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_7_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_7_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_7_2 = "-";
                  this.layBetPrice_7_2 = "-";
                  this.backBetPrice_7_3 = '-';
                  this.layBetPrice_7_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_7_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_7_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_7_2 = '-';
                  this.layBetPrice_7_2 = '-';
                  this.backBetPrice_7_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_7_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_7_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_7_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_7_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_7_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_7_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_7_3 = inPlayData.runners[1].lay[0].price;  
                }
              });  
              this.EventName_7 = data[7].EventName;
            }
          }
          if(data.length>8){  
            if(data[8].EventTypeName=="Cricket"){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[8].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_8 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_8_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_8_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_8_2 = "-";
                  this.layBetPrice_8_2 = "-";
                  this.backBetPrice_8_3 = '-';
                  this.layBetPrice_8_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_8_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_8_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_8_2 = '-';
                  this.layBetPrice_8_2 = '-';
                  this.backBetPrice_8_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_8_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_8_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_8_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_8_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_8_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_8_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_8_3 = inPlayData.runners[1].lay[0].price;  
                }
              });   
              this.EventName_8 = data[8].EventName;
            }
          }
          if(data.length>9){  
            if(data[9].EventTypeName=="Cricket"){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[9].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_9 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_9_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_9_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_9_2 = "-";
                  this.layBetPrice_9_2 = "-";
                  this.backBetPrice_9_3 = '-';
                  this.layBetPrice_9_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_9_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_9_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_9_2 = '-';
                  this.layBetPrice_9_2 = '-';
                  this.backBetPrice_9_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_9_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_9_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_9_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_9_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_9_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_9_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_9_3 = inPlayData.runners[1].lay[0].price;  
                }
              });
              this.EventName_9 = data[9].EventName;
            }
          }
          if(data.length>10){  
            if(data[10].EventTypeName=="Cricket"){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[10].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_10 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_10_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_10_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_10_2 = "-";
                  this.layBetPrice_10_2 = "-";
                  this.backBetPrice_10_3 = '-';
                  this.layBetPrice_10_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_10_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_10_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_10_2 = '-';
                  this.layBetPrice_10_2 = '-';
                  this.backBetPrice_10_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_10_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_10_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_10_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_10_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_10_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_10_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_10_3 = inPlayData.runners[1].lay[0].price;  
                }
              }); 
              this.EventName_10 = data[10].EventName;
            }
          }
          if(data.length>11){  
            if(data[11].EventTypeName=="Cricket"){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[11].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_11 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_11_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_11_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_11_2 = "-";
                  this.layBetPrice_11_2 = "-";
                  this.backBetPrice_11_3 = '-';
                  this.layBetPrice_11_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_11_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_11_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_11_2 = '-';
                  this.layBetPrice_11_2 = '-';
                  this.backBetPrice_11_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_11_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_11_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_11_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_11_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_11_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_11_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_11_3 = inPlayData.runners[1].lay[0].price;  
                }
              }); 
              this.EventName_11 = data[11].EventName;
            }
          }
          if(data.length>12){  
            if(data[12].EventTypeName=="Cricket"){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[12].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_12 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_12_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_12_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_12_2 = "-";
                  this.layBetPrice_12_2 = "-";
                  this.backBetPrice_12_3 = '-';
                  this.layBetPrice_12_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_12_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_12_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_12_2 = '-';
                  this.layBetPrice_12_2 = '-';
                  this.backBetPrice_12_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_12_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_12_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_12_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_12_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_12_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_12_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_12_3 = inPlayData.runners[1].lay[0].price;  
                }
              });  
              this.EventName_12 = data[12].EventName;      
            }
          }
          if(data.length>13){  
            if(data[13].EventTypeName=="Cricket"){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[13].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_13 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_13_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_13_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_13_2 = "-";
                  this.layBetPrice_13_2 = "-";
                  this.backBetPrice_13_3 = '-';
                  this.layBetPrice_13_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_13_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_13_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_13_2 = '-';
                  this.layBetPrice_13_2 = '-';
                  this.backBetPrice_13_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_13_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_13_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_13_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_13_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_13_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_13_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_13_3 = inPlayData.runners[1].lay[0].price;  
                }
              });  
              this.EventName_13 = data[13].EventName;
            }
          }
          if(data.length>14){  
            if(data[14].EventTypeName=="Cricket"){
              this.http.get('http://115.124.103.128:5105/getFeed?mid='+data[14].MarketID+'&type=odds').subscribe((inPlayData:any) => {
                this.marketId_14 = inPlayData.marketId;
                if(inPlayData.numberOfActiveRunners=="1"){
                  this.backBetPrice_14_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_14_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_14_2 = "-";
                  this.layBetPrice_14_2 = "-";
                  this.backBetPrice_14_3 = '-';
                  this.layBetPrice_14_3 = '-';  
                }
                if(inPlayData.numberOfActiveRunners=="2"){
                  this.backBetPrice_14_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_14_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_14_2 = '-';
                  this.layBetPrice_14_2 = '-';
                  this.backBetPrice_14_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_14_3 = inPlayData.runners[1].lay[0].price;  
                }
                if(inPlayData.numberOfActiveRunners=="3"){
                  this.backBetPrice_14_1 = inPlayData.runners[0].back[0].price;
                  this.layBetPrice_14_1 = inPlayData.runners[0].lay[0].price;
                  this.backBetPrice_14_2 = inPlayData.runners[2].back[0].price;
                  this.layBetPrice_14_2 = inPlayData.runners[2].lay[0].price;
                  this.backBetPrice_14_3 = inPlayData.runners[1].back[0].price;
                  this.layBetPrice_14_3 = inPlayData.runners[1].lay[0].price;  
                }
              }); 
              this.EventName_14 = data[14].EventName;
            }
          }  
       });
    //});
    this.http.get('/matieres/getStakes?userId='+this.userId).subscribe((data:any) => {
      console.log("data==="+JSON.stringify(data.result.length));
      if(data.result.length>0){
      let data_array = JSON.parse(data.result[0].stake);
      console.log(""+data_array[0]);         
       this.stake1 = data_array[0];
       this.stake2 = data_array[1];
       this.stake3 = data_array[2];
       this.stake4 = data_array[3];
       this.stake5 = data_array[4];
       this.stake6 = data_array[5];
      }
   });
  }
}
