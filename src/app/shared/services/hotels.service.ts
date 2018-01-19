import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HotelsService {
	data: any[] = null;
  constructor(private http: Http) { }

  getHotels(){
		return this.http.get(`../assets/data/data.json`)
		.map(res => res.json())
		.catch((error:any) => {
			return Observable.throw(error);
		})
	}	
}
