import {ChangeDetectionStrategy, OnChanges, Component, Input, Output, EventEmitter, SimpleChanges, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-date-field',
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './date-field.component.html',
  styleUrl: './date-field.component.scss'
})

export class DateFieldComponent implements OnChanges {
  @Input() label: string = 'Pilih Tanggal';
  @Input() selectedDate: string = '';
  @Output() valueChange = new EventEmitter<any>();

  date = new FormControl<Date | null>(null);
  today = new Date();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedDate'] && changes['selectedDate'].currentValue){
      this.date.setValue(new Date(changes['selectedDate'].currentValue));
    }else{
      this.date.setValue(null);
    }
  }
  
  ngOnInit(): void {
    this.date.valueChanges.subscribe((newValue) => {
      if(newValue){
        this.valueChange.emit(moment(newValue));
      }
    });
  }
}
