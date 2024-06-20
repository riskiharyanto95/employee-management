import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})

export class InputFieldComponent {

  @Input() label: string = 'Label';
  @Input() type: string = 'text';
  @Input() placeholder: string = ''; 
  @Input() className: string = '';
  @Input() value: string | number = '';
  @Input() isDisabled: boolean = false;

  @Output() valueChange: EventEmitter<string | number> = new EventEmitter<string | number>();

  onInput(event: Event) {
    let value: string | number = (event.target as HTMLInputElement).value;

    if (this.type == 'number') {
      value = parseFloat(value)
    } else {
      value = value;
    }
    this.valueChange.emit(value);
  }

}
