import { Component, OnInit  } from '@angular/core';
import { IKey } from '../shared/button.model';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent implements OnInit {

  currentDisplay: string = "0";
  activeOperator: string = "";
  keyAttributes: Array<IKey> = [
    {label: "AC", color: "#2b2a36", width: 65, type: "clear", action: () => this.clearDisplay()}, 
    {label: "±", color: "#2b2a36", width: 65, type: "changeSign", action: () => this.changeSign()}, 
    {label: "%", color: "#2b2a36", width: 65, type: "percent"}, 
    {label: "÷", color: "#fd8d08", width: 65, type: "divide", active: false, action: () => this.changeActivation(3)}, 
    {label: "7", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "8", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "9", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "X", color: "#fd8d08", width: 65, type: "multiply", active: false, action: () => this.changeActivation(7)}, 
    {label: "4", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "5", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "6", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "-", color: "#fd8d08", width: 65, type: "subtract", active: false, action: () => this.changeActivation(11)}, 
    {label: "1", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "2", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "3", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "+", color: "#fd8d08", width: 65, type: "add", active: false, action: () => this.changeActivation(15)}, 
    {label: "0", color: "#4a4952", width: 140, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: ".", color: "#4a4952", width: 65, type: "decimal", action: (label: string) => this.appendDisplay(label)}, 
    {label: "=", color: "#fd8d08", width: 65, type: "equals"}
  ]

  constructor() { }

  ngOnInit(): void {

  }

  private appendDisplay(key: string): void {
    this.currentDisplay += key;
    if (this.currentDisplay[0] === '0') {
      this.currentDisplay = this.currentDisplay.slice(1, this.currentDisplay.length); 
    }
    
  }

  private clearDisplay(): void {
    this.currentDisplay = '0';
  }

  private changeSign(): void {
    if (this.currentDisplay !== '0') {
      if (this.currentDisplay[0] !== '-') {
        this.currentDisplay = `-${this.currentDisplay}`;
      } else {
        this.currentDisplay = this.currentDisplay.slice(1, this.currentDisplay.length); 
      }
    }
  }

  private changeActivation(id: number): void {
    this.activeOperator = this.keyAttributes[id].label;
    for (let key of this.keyAttributes) {
      if (key.label === this.activeOperator) {
        key.active = true;
      } else {
        key.active = false;
      }
    }
    console.log(this.activeOperator);
  }

}
