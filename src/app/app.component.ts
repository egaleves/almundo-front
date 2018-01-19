import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { HotelsService } from './shared/services/hotels.service';
import { Hotel } from './shared/models/hotel';

let ctx = null;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  providers: [HotelsService],
  animations: [
    trigger('showFilters',
      [
      transition(':enter', [style({opacity: 0}),
      animate('300ms', style({opacity: 1}))]),
      transition(':leave', [style({opacity: 1}),
      animate('300ms', style({opacity: 0}))])
      ]
    ),
  ]
})
export class AppComponent {
  hotelList: Hotel[] = [];
  hotels: Hotel[] = [];
  filteredHotels:Hotel[] = [];
  inputname: string = "";
  allstars: boolean = true;
  dirtyinput: boolean = false;
  validname: boolean = true;
  arrstars: any[] = this.createInitStars();
  valuesStars: number[] = [1,2,3,4,5]; 
  loading: boolean = false;
  showsmfilters: boolean = true;
  constructor(private service:HotelsService) {
    ctx = this;
    this.loading = true;
    this.service.getHotels()
      .subscribe(res => {
        this.hotelList = res;
        this.hotels = res;
        this.filteredHotels = res;
        this.loading = false;
      },
      err => console.log(err)
     );
     //this.showsmfilters = window.screen.width;
     this.showsmfilters = window.innerWidth > 980;
  }

  handleSendName() {
    var regex = /^[\da-zA-Z\-\&']+([\da-zA-Z\-\&' ]{0,1})+[\da-zA-Z\-\&']$/;
    this.dirtyinput = true;
    this.inputname = this.inputname.trim();
    if ( this.inputname == "" )  return false;
    this.validname = regex.test(this.clearAccents(this.inputname)) && this.inputname.length < 100;
    if ( this.validname ) {
      this.hotels = this.getHotelsByName(this.inputname);
      this.filteredHotels = this.filterByStars();
    }
  }

  getHotelsByName(nameH) {
    var name = this.clearAccents(nameH), idx = -1;
    return this.hotelList.filter(function (objH) {
      idx = ctx.clearAccents(objH.name).toLowerCase().indexOf(ctx.clearAccents(name).toLowerCase());
      return idx != -1;
    });
  }
  
  filterByStars() {
    return this.hotels.filter(function(ho) {
      return ctx.valuesStars.indexOf(ho.stars) != -1; 
    });
  }

  handleChange(ev) {
    this.validname = true;
  }

  createInitStars() {
    var arrOjbs = [];
    for (let i=0;i<5;i++)
      arrOjbs.push({val:""+(i+1),chckd:true});
    return arrOjbs;
  }

  handleChangeChecks(idx,val) {
    var arrSts = [];
    if (idx == -1) {
      this.allstars = !this.allstars;
      if (this.allstars) {
        this.arrstars = this.createInitStars();
      }
    }
    this.arrstars.map((st)=>{
      if (st.chckd) arrSts.push(~~st.val);
    });
    this.valuesStars = arrSts;
    this.filteredHotels = this.filterByStars();
  }

  handleShowFiltersSm() {
    this.showsmfilters = !this.showsmfilters;
  }

  createArr(num) {
    var arr = [];
    for (let i=0;i<num;i++)
      arr.push(i);
    return arr;
  }

  clearAccents(str) {
    var from = "ÃÀÁÄ ÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc", mapping = {};
    for (var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );
    var ret = [], k = str.length;
    for( var i = 0; i < k; i++ ) {
      var c = str.charAt( i );
      if( mapping.hasOwnProperty( str.charAt( i ) ) )
        ret.push( mapping[ c ] );
      else
        ret.push( c );
    }
    return ret.join( '' );
  }


}
