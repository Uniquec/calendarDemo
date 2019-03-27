import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  today = '';
  week = new Array(7);
  weeks = [[],[],[],[],[]];

  year = 0;
  month = '';
  day = 0;
  showDown = true;
  showUp = false;
  maxMonthDay = 0;

  constructor(public navCtrl: NavController) {
    const date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : '' + (date.getMonth() + 1);
    this.day = date.getDate();
    this.today = this.year + '- ' + this.month + '-' + this.day;

    this.calculateMaxMonthDay();

    const weekday = date.getDay();
    this.week[weekday] = this.day;
    for (let i = -weekday; i <= 0; i++) {
      if (this.day + i <= 0) continue;
      this.week[weekday + i] = this.day + i;
    }
    for (let i = 0; i <= 6 - weekday; i++) {
      if(this.day + i >= this.maxMonthDay) continue;
      this.week[weekday + i] = this.day + i;
    }
    for(let i = 1;i < 6;i++){
      for(let j = 1;j < 8;j++){
        this.weeks[i][j] = 1;
      }
    }
    let count = 0;
    let dayTemp = this.day;
    while (dayTemp > 0){
      dayTemp -= 7;
      count++;
    }
    dayTemp += 7;
    if(dayTemp - 1 > weekday){
      count++;
    }
    for(let i = count;i >= 0;i++){
      // this.weeks[i] = [];
      console.log(this.weeks);
      this.weeks[i][1] = this.day - 7*i;
    }
  }
  calculateMaxMonthDay(){
    if ((this.year % 4 === 0 && this.year % 100 !== 0) || (this.year % 400 === 0)) {
      if (this.month === '01' || this.month === '03' || this.month === '05' || this.month === '07' || this.month === '08' || this.month === '10' || this.month === '12') {
        this.maxMonthDay = 32;
      } else if (this.month === '04' || this.month === '06' || this.month === '09' || this.month === '11') {
        this.maxMonthDay = 31;
      } else {
        this.maxMonthDay = 30;
      }
    } else {
      if (this.month === '01' || this.month === '03' || this.month === '05' || this.month === '07' || this.month === '08' || this.month === '10' || this.month === '12') {
        this.maxMonthDay = 32;
      } else if (this.month === '04' || this.month === '06' || this.month === '09' || this.month === '11') {
        this.maxMonthDay = 31;
      } else {
        this.maxMonthDay = 29;
      }
    }
  }
  showFullDate(){
    this.showDown = false;
    this.showUp = true;
  }
  showWeekDate(){
    this.showDown = true;
    this.showUp = false;
  }
}
