import { Component, OnInit  } from '@angular/core';
import { IKey } from '../shared/button.model';
import { IOperation } from '../shared/operation.model';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent implements OnInit {

  currentDisplay: string = "0";
  activeOperator: string = "";
  storedValues: IOperation[] = [];
  clearDisplayOnNext: boolean = false;

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
    {label: "=", color: "#fd8d08", width: 65, type: "equals", action: () => this.evaluate()}
  ]

  constructor() { }

  ngOnInit(): void {

  }

  private appendDisplay(key: string): void {
    if (this.clearDisplayOnNext) {
      this.currentDisplay = key;
      this.clearDisplayOnNext = false;
    } else {
      this.currentDisplay += key;
    }
    if (this.currentDisplay[0] === '0') {
      this.currentDisplay = this.currentDisplay.slice(1, this.currentDisplay.length); 
    }
    
  }

  private clearDisplay(): void {
    this.currentDisplay = '0';
    for (let key of this.keyAttributes) {
      if (key.label === this.activeOperator) {
        key.active = true;
      } else {
        key.active = false;
      }
    }
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
    this.storedValues.push({value: this.currentDisplay, operator: this.activeOperator});
    for (let key of this.keyAttributes) {
      if (key.label === this.activeOperator) {
        key.active = true;
        this.clearDisplayOnNext = true;
      } else {
        key.active = false;
      }
    }
    console.log(this.storedValues);

  }

  private evaluate() {
    let totalThusFar: number = 0;
    let nextOperation: string | null = null;
    // let equation = "";
    // for (let storedValue of this.storedValues) {
    //   equation += `${storedValue.value} ${storedValue.operator} `;
    // }
    // equation += this.currentDisplay

    for (let storedValue of this.storedValues) {
      console.log(totalThusFar);
      if (nextOperation === null) {
        totalThusFar = +storedValue.value;
      } 
      nextOperation = storedValue.operator;
      switch (nextOperation) {
        case 'X':
          totalThusFar *= +this.currentDisplay;
          console.log(nextOperation);
          break;
        case '÷':
          totalThusFar /= +this.currentDisplay;
          console.log(nextOperation);
          break;
        case '+':
          totalThusFar += +this.currentDisplay;
          console.log(nextOperation);
          break;
        case '-':
          totalThusFar -= +this.currentDisplay;
          console.log(nextOperation);
          break;
      }
    }


    console.log(totalThusFar)
    this.currentDisplay = totalThusFar.toString();
    for (let key of this.keyAttributes) {
      key.active = false;
    }
    this.clearDisplayOnNext = true;
    this.storedValues = [];
  }

}
