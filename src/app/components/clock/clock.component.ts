import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})

export class ClockComponent implements OnInit, OnDestroy {
  @Input() initialTime!: number;
  @Output() timeRemaining = new EventEmitter<number>();

  faPause=faPause;
  faPlay=faPlay;

  remainingTime: number = 0;
  time: string = "00:00";
  isClockRunning = false;
  private clockSubscription: Subscription = Subscription.EMPTY;

  // preserve first value of initialTime
  private _initialTime!: number;
  private isInitialTimeSet = false;

  ngOnInit() {
    // this.startClock();
    // this.remainingTime = this.initialTime;

    // console.log("IIinitialTime:" + this.initialTime + "    type:" + typeof (this.initialTime));
  }

  ngOnDestroy() {
    this.stopClock();
  }

  startClock() {
    if (!this.isInitialTimeSet) {
      this._initialTime = this.initialTime;
      this.isInitialTimeSet = true;
    }

    this.remainingTime = this.initialTime;
    //console.log("IIinitialTime:" + this.initialTime + "    type:" + typeof (this.initialTime));

    this.isClockRunning = true;
    //console.log("IinitialTime:" + this.initialTime + "    Remainingseconds:" + this.remainingTime);

    this.clockSubscription = interval(1000).subscribe(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.time = this.formatTime(this.remainingTime);
      } else {
        this.stopClock();
      }
    });
  }

  stopClock() {
    this.isClockRunning = false;
    this.timeRemaining.emit(this.remainingTime);
    if (this.clockSubscription) {
      this.clockSubscription.unsubscribe();
    }
  }

  toggleClock() {
    if (this.isClockRunning) {
      this.stopClock();
    } else {
      this.startClock();
    }
  }

  private formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  }

  private padNumber(number: number): string {
    return number.toString().padStart(2, '0');
  }
}
