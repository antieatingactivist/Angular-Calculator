import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  
  constructor() { }
  @Input() keyAttribute: any;


  ngOnInit(): void {
  }
  getStyle(): object {
    return {
      backgroundColor: this.keyAttribute.color,
      width: `${this.keyAttribute.width}px`
    }
  }
  click(type: string, label: string): void {
    console.log(type, label);
  }

}
