import { Component, Input } from '@angular/core';

interface KeyAttribute {
  backgroundColor: string;
  width: string;
  borderWidth: string;
  borderColor: string;
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  constructor() { }
  @Input() keyAttribute: any;

  getStyle(): KeyAttribute {
    return {
      backgroundColor: this.keyAttribute.color,
      width: `${this.keyAttribute.width}%`,
      borderWidth: this.keyAttribute.active ? '3px' : '1px',
      borderColor: this.keyAttribute.active ? '#000000' : '#000000 #000000 #00000000 #00000000' ,
    }
  }

}
