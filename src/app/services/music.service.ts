import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, retry } from 'rxjs/operators';
import * as dataArtist from './artist.json';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) { }

  getdataArtist(): any {
    return dataArtist.items;
  }

  getNewReleases(): Observable<any> {
    return this.createGetRequest( 'browse', 'new-releases');
  }

  getArtistTopTracks(artistId: number): Observable<any> {
    return this.createGetRequest( 'artists', `${artistId}/top-tracks?country=CO`);
  }

  getAlbumsTracks(albumId: number): Observable<any> {
    return this.createGetRequest( 'albums', `${albumId}/tracks?country=CO`);
  }

  searchTracks(text: string): Observable<any> {
    return this.createGetRequest( 'search', `?q=${text}&type=track`);
  }

  private createGetRequest( endPoint: string, operation: string ): Observable<any> {
    const base = this.http.get(`${environment.apiURL}/${endPoint}/${operation}`);
    const request = base.pipe(retry(3), catchError(this.handleError));
    return request;
  }

  private handleError(error: HttpErrorResponse) {
     
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      return throwError('Something bad happened; please try again later.');
    } else {
      return throwError({ status: error.status, body: JSON.stringify(error.error) });
    }
  }
}
