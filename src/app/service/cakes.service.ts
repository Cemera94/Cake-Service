import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cake } from '../model/cake.model';
import { Observable, map } from 'rxjs';
import { SlideShow } from '../model/slideshow.model';
import { Profile } from '../model/profile.model';
import { Message } from '../model/message.model';

const baseUrl = "http://localhost:3000/api";

@Injectable({
  providedIn: 'root'
})
export class CakesService {

  constructor(private http: HttpClient) { }

  getCakes(params?: any): Observable<Cake[]> {
    let options = {};
    if (params) {
      options = {
        params: new HttpParams()
          .set('sort', params.sort || '')
          .set('sortDirection', params.sortDirection || '')
          .set(
            'filter',
            (params.filter && JSON.stringify(params.filter)) || ''
          ),
      };
    }
    return this.http.get(`${baseUrl}/cakes`, options).pipe(map((data: any) => {
      return data && data.map((elem: any) => new Cake(elem)) || []
    }))
  }

  getIngredients(): Observable<string[]> {
    return this.http.get(baseUrl + '/ingredients').pipe(
      map((data: any) => {
        return data as Array<string>;
      })
    );
  }

  getCake(cakeId: number): Observable<Cake> {
    return this.http.get(`${baseUrl}/cakes/${cakeId}`).pipe(map((data: any) => {
      return new Cake(data);
    }))
  }

  getSlideshow(): Observable<SlideShow[]> {
    return this.http.get(`${baseUrl}/slideshow`).pipe(map((data: any) => {
      return data && data.map((elem: any) => new SlideShow(elem)) || [];
    }))
  }

  getUser(): Observable<Profile> {
    return this.http.get(`${baseUrl}/user`).pipe(map((data: any) => {
      return data && new Profile(data[0]);
    }))
  }

  updateUser(user: Profile): Observable<Profile> {
    return this.http.put(`${baseUrl}/user/${user._id}`, user).pipe(map((data: any) => {
      return new Profile(data);
    }))
  }

  sendMessage(message: Message): Observable<any> {
    return this.http.post(`${baseUrl}/messages`, message)
  }
}

