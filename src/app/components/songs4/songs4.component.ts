import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SONGS } from '../../mock-songs';
import { Song } from '../../Song';
//import { Sort, MatSort } from '@angular/material/sort';
import { SongService } from '../../services/song.service'
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MaterialModule } from '../../material/material.module';

import { HttpClient } from '@angular/common/http';

//for push notification
import { SwUpdate, SwPush } from '@angular/service-worker';
import { interval } from 'rxjs';
import { PushNotificationService } from '../../push-notification.service';

//for sort
import { Sort } from '../../util/sort';
import { Directive, Input, Renderer2, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-songs4',
  templateUrl: './songs4.component.html',
  styleUrls: ['./songs4.component.css']
})
export class Songs4Component implements OnInit, AfterViewInit {
  //display testing
  /*
  regularInput = "regular inputhkjhkjhkjhkjhjkh jhkj jkh k";
  disabledInput = "disabled input jh kjkh jk hjk jkjkh jk jk jk";
  disabled = true;
  */

  private readonly publicKey =
    'BMLhyybcE62Dgw24C-yu1TQa0J38zAuqOI_QfSyC3D8M4tDWoc1jQzFV25qTW-Q-X37ACQGsfqq4KdM9y1ad_5A';


  songs: Song[] = SONGS;
  allSongs: Song[] = [];
  private date = new Date();
  //filterDate: string = Date.now().toString();
  filterDate = this.date.toLocaleDateString()
  convertedFilterDate = this.datepipe.transform(this.filterDate, 'MM/dd/yyyy');
  buttonClickCount: number = 0;
  error: boolean = false;   //used for fake error message
  dataProcessed = false;   //used for fake processing info

  constructor(private songService: SongService,
    private datepipe: DatePipe,
    private swPush: SwPush,
      private _notificationService: PushNotificationService) {
    //this.songs = this.songs.slice();
  }

  ngOnInit(): void {
    console.log("ngOnInit ...");
    this.getSongs();

    this.pushSubscription();
  
      this.swPush.messages.subscribe((message) => console.log(message));
  
      this.swPush.notificationClicks.subscribe(({ action, notification }) => {
        window.open(notification.data.url);
      });
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit ...");
    //console.log(this.titleDiv);
  }

  getSongs(): void {
    console.log("getSongs ...");
    //this.songs = this.songService.getSongs();

    this.songService.getSongs()
      .subscribe(
        (data: Song[]) => {
          this.songs = data;
          this.allSongs = this.songs;
        });
  }

  addRow() {
    console.log("addRow ...");
    //this.ckeckForError()

    const newRow = {
      id: Date.now(),
      title: '',
      artist: '',
      releaseDay: '',
      isEdit: true,
    };


    //api version
    this.songService.addSong(newRow as Song)
      .subscribe(song => {
        //this.dataList.push(employee);
        //this.allDataList.push(employee);

        this.songs = [song, ...this.songs];
        this.allSongs = this.songs;
      })


  }

  saveRow(song: Song) {
    console.log("save " + song.id);

    this.ckeckForError()

    if (song) {
      song.isEdit = false;
      
      //local data
      let index = this.songs.indexOf(song);
      
      this.songs[index] = song;
      this.allSongs = this.songs;

      //api version
      this.songService.updateSong(song)
        .subscribe(
          //song =>{
          //  this.songs[index] = song;
          //  this.allSongs = this.songs;
          //}
        );
    }

    //send push notification
    this.notify();
  }

  editRow(song: Song) {
    console.log("edit " + song.id);

    //this.ckeckForError()
    song.isEdit = true;

    //local data
    let index = this.songs.indexOf(song);
    this.songs[index] = song;
    this.allSongs = this.songs;

    //no need to save since data is not changed yet
    //api version
    //this.employeeService.updateEmployee(employee).subscribe();
  }

  deleteRow(song: Song) {
    console.log("delete " + song.id);
    //this.ckeckForError()

    //array version
    //this.dataList = this.dataList.filter((u) => u.employeeId !== employee.employeeId);
    //this.allDataList = this.dataList;

    //rest api call
    this.songs = this.songs.filter(h => h !== song);
    this.allSongs = this.songs;
    this.songService.deleteSong(song.id).subscribe();
  }

  applyFilter(filterBy: string) {
    console.log("inside applyFilter");
    console.log("filtering by " + filterBy);

    /*
    console.log("before filter - songs");
    for (let i = 0; i < this.songs.length; i++) {
      console.log(this.songs[i]);
    }

    console.log("before filter - allsongs");
    for (let i = 0; i < this.allSongs.length; i++) {
      console.log(this.allSongs[i]);
    }
    */

    this.songs = this.allSongs.filter((val) =>
      val.releaseDay <= filterBy
    );

    /*
    console.log("after filter - songs");
    for (let i = 0; i < this.songs.length; i++) {
      console.log(this.songs[i]);
    }

    console.log("after filter - allsongs");
    for (let i = 0; i < this.allSongs.length; i++) {
      console.log(this.allSongs[i]);
    }*/
  }

  cancelFilter() {
    console.log("cancel filter ...");

    this.songs = this.allSongs;
  }

  //this procedure will set error to true if called 5, 11, 15 ... times
  ckeckForError() {
    this.buttonClickCount++;

    if (this.buttonClickCount == 0){
      this.error = false;
      this.dataProcessed = false;
    }else{
      if (this.buttonClickCount !== 0 && this.buttonClickCount % 5 === 0) {
        this.error = true;
        this.dataProcessed = false;
  
      } else {
        this.error = false;
        this.dataProcessed = true;
      }
    }  
  }


  pushSubscription() {
    if (!this.swPush.isEnabled) {
      console.log('Notification is not enabled');
      return;
    }

    this.swPush
      .requestSubscription({
        serverPublicKey: this.publicKey,
      })
      .then((sub) => {
        // Make a post call to serve
        console.log(JSON.stringify(sub));
      })
      .catch((err) => console.log(err));
  }


  notify() {
    let data: Array<any> = [];
    data.push({
      'title': 'New Song Added',
      'alertContent': 'A new song has been released'
    });
    
    
    this._notificationService.generateNotification(data);
  }
}



