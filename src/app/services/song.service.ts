import { Injectable } from '@angular/core';
import { Song } from '../Song';
import { SONGS } from '../mock-songs';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private songsUrl = 'api/songs';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getSongs(): Observable<Song[]> {
    //fetch data from mock file
    //const employees = of(EMPLOYEES);
    //this.messageService.add('EmployeeService: fetched employees');
    //return employees;
    return this.http.get<Song[]>(this.songsUrl)
      .pipe(
        tap(_ => this.log('fetched songs')),
        catchError(this.handleError<Song[]>('getSongs', []))
      );

  }

  /** POST: add a new song to the server */
  addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.songsUrl, song, this.httpOptions).pipe(
      tap((newSong: Song) => this.log(`added song w/ id=${newSong.id}`)),
      catchError(this.handleError<Song>('addSong'))
    );
  }

  /** PUT: update the hero on the server */
  updateSong(song: Song): Observable<any> {
    console.log("inside song.service updateSongprocedure");
    console.log("the song id is " + song.id);
    console.log(song);

    return this.http.put(this.songsUrl, song, this.httpOptions).pipe(
      tap(_ => this.log(`updated song id=${song.id}`)),
      catchError(this.handleError<any>('updateSong'))
    );
  }

  /** DELETE: delete the song from the server */
  deleteSong(id: number): Observable<Song> {
    const url = `${this.songsUrl}/${id}`;

    return this.http.delete<Song>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted song id=${id}`)),
      catchError(this.handleError<Song>('deleteSong'))
    );
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
*
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}

