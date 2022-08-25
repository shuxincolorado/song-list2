import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Song } from '../Song';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb() {
    const songs = [
      {
        "id": 1,
        "title": "Country Road Take Me Home",
        "artist": "John Denver",
        "releaseDay": '1971-09-23',
        "price": 1.99,
        "isEdit": false
      },
      {
        "id": 2,
        "title": "Billie Jean",
        "artist": "Michael Jackson",
        "releaseDay": "1982-01-01",
        "price": 1.90,
        "isEdit": false
      },
      {
        "id": 3,
        "title": "Bad Blood",
        "artist": "Tailor Swift",
        "releaseDay": "2017-05-01",
        "price": 0.99,
        "isEdit": false
      },
      {
          "id": 4,
          "title": "Hold My Hand",
          "artist": "Lady Gaga",
          "releaseDay": "2022-05-10",
          "price": 0.49,
          "isEdit": false
        },
        {
          "id": 5,
          "title": "Rain On Me",
          "artist": "Lady Gaga",
          "releaseDay": "2020-11-23",
          "price": 0.70,
          "isEdit": false
        },
    ];

    return {songs};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(songs: Song[]): number {
    return songs.length > 0 ? Math.max(...songs.map(song => song.id)) + 1 : 11;
  }
}

