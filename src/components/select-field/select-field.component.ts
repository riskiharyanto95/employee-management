import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface SelectInterface {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.scss'
})
export class SelectFieldComponent {
  @Input() options: any[] = [];
  @Input() label: string = 'Select';
  @Input() valueField: string = 'value';
  @Input() displayField: string = 'label';
  @Input() className: string = '';
  @Input() selectedData: string = '';
  @Input() isDisabled: boolean = false;
  @Output() valueChange = new EventEmitter<any>();

  controlSearch = new FormControl();
  filteredOptions: any = [];
  
  constructor() {}
  protected _onDestroy = new Subject<void>();

  onSelectionChange(selected: any){
    this.valueChange.emit(selected.value);
  }

  changeControl(){
    let search = this.controlSearch.value;
    if(!this.options || !search){
      this.filteredOptions = this.options;
    } else {
      const newListOptions = this.options.filter(option => option.label.toLowerCase().indexOf(search.toLowerCase()) > -1);
      this.filteredOptions = newListOptions;
    }
  }

  ngOnInit() {
    this.filteredOptions = this.options;
    this.controlSearch.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.changeControl();
      });
  }
}




