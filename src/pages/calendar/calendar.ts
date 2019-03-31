import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  date = new Date('2019/3/28');
  year = this.date.getFullYear();
  month = this.date.getMonth() + 1;
  calendarDay = this.date.getDate();
  week = [];
  months = [];
  today = '';
  choosenDay = this.date.getDate();

  showDown = true;
  showUp = false;
  showToday = true;

  constructor(public navCtrl: NavController) {
    console.log(this.choosenDay)
    let monthText = this.month < 10 ? '0' + this.month : '' + this.month;
    let dayText = this.calendarDay < 10 ? '0' + this.calendarDay : '' + this.calendarDay;
    this.today = this.year + '-' + monthText + '-' + dayText;
    const day = this.getFirstDayWeek();
    const endDay = this.getEndDay();
    let weeks = 0;
    let start = 1 - day;
    for (let i = 0; ; i++) {
      this.months[i] = [];
      for (let j = 0; j < 7; j++) {
        this.months[i][j] = start;
        start = start + 1;
      }
      weeks++;
      if(start>endDay){
        break;
      }
    }
    for (let i = 0; i<weeks; i++) {
      for (let j = 0; j < 7; j++) {
        if (this.months[i][j] <= 0 || this.months[i][j] > endDay) {
          this.months[i][j] = null;
        }
      }
    }


    let currentDay = this.date.getDay();
    this.week[currentDay + 1] = this.calendarDay;
    for(let i = -currentDay;i <= 0;i++){
      if(this.calendarDay + i <= 0) continue;
      this.week[currentDay + i] = this.calendarDay + i;
    }
    for(let i = 0;i <= 6 - currentDay;i++){
      if(this.calendarDay + i > endDay) continue;
      this.week[currentDay + i] = this.calendarDay + i;
    }
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
   * 判断闰年
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

  clickDay(myday){
    this.choosenDay = myday;
  }

  backToToday(){
    this.choosenDay = this.calendarDay;
  }
}
