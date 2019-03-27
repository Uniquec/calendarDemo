import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  date = new Date();
  year = this.date.getFullYear();
  month = this.date.getMonth() + 1;
  months = [];
  today = '';

  showDown = true;
  showUp = false;

  constructor(public navCtrl: NavController) {
    let monthText = this.month < 10 ? '0' + this.month : '' + this.month;
    this.today = this.year + '-' + monthText + '-' + this.date.getDate();
    const day = this.getFirstDayWeek();
    const endDay = this.getEndDay();
    const weeks = this.getWeeks();
    let start = 1 - day;
    for (let i = 0; i < weeks; i++) {
      this.months[i] = [];
      for (let j = 0; j < 7; j++) {
        this.months[i] = start;
        start = start + 1;
      }
    }
    for (let i = 0; i < weeks; i++) {
      for (let j = 0; j < 7; j++) {
        if (this.months[i][j] <= 0 || this.months[i][j] > endDay) {
          this.months[i][j] = null;
        }
      }
    }
    console.log(this.months)
  }

  /**
   * 这个月第一天是周几
   */
  getFirstDayWeek() {
    return new Date(`${this.year}/${this.month}/1`).getDay();
  }

  /**
   * 这个月有几天
   */
  getEndDay() {
    const BIG_MONTH = [1, 3, 5, 7, 8, 10, 12];
    if (BIG_MONTH.indexOf(this.month) !== -1) {
      return 31;
    } else if (this.month === 2) {
      if (this.judge()) return 29;
      else return 28;
    } else {
      return 30;
    }
  }

  /**
   * 这个月有几周
   */
  getWeeks() {
    let day = this.getEndDay();
    let count = 0;
    while (day) {
      day -= 7;
      count++;
    }
    return count;
  }

  /**
   * 判断闰年
   * @returns {boolean}
   */
  judge() {
    const n = this.year;
    return (n % 4 == 0 && n % 100 != 0) || n % 400 == 0;
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
