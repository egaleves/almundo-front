import { Component, Input, OnInit } from '@angular/core';
import { Hotel } from '../shared/models/hotel';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.styl']
})
export class HotelComponent implements OnInit {
	@Input() hotel: Hotel;
  constructor() { }
  
  ngOnInit() { }

  handleViewHotel() {
    console.log("Click en el botton");
  }
  
  createArr(num) {
    var arr = [];
    for (let i=0;i<num;i++)
      arr.push(i);
    return arr;
  }

}
