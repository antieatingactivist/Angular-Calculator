import { Component, OnInit  } from '@angular/core';
import { IKey, IOperation } from '../shared/';


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
    {label: "AC", color: "#2b2a36", width: 65, type: "clear", action: (label: string) => this.clearDisplay(label)}, 
    {label: "±", color: "#2b2a36", width: 65, type: "changeSign", action: () => this.changeSign()}, 
    {label: "%", color: "#2b2a36", width: 65, type: "percent", action: () => this.getPercent()}, 
    {label: "÷", color: "#fd8d08", width: 65, type: "divide", active: false, action: (label: string) => this.changeActivation(label)}, 
    {label: "7", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "8", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "9", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "X", color: "#fd8d08", width: 65, type: "multiply", active: false, action: (label: string) => this.changeActivation(label)}, 
    {label: "4", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "5", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "6", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "-", color: "#fd8d08", width: 65, type: "subtract", active: false, action: (label: string) => this.changeActivation(label)}, 
    {label: "1", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "2", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "3", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "+", color: "#fd8d08", width: 65, type: "add", active: false, action: (label: string) => this.changeActivation(label)}, 
    {label: "0", color: "#4a4952", width: 130, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: ".", color: "#4a4952", width: 65, type: "decimal", action: (label: string) => this.appendDisplay(label)}, 
    {label: "=", color: "#fd8d08", width: 65, type: "equals", action: () => this.evaluate()}
  ]

  constructor() { }

  ngOnInit(): void {

  }

  private appendDisplay(key: string): void {
    this.keyAttributes[0].label = "C";
    if (this.clearDisplayOnNext) {
      this.currentDisplay = key;
      this.clearDisplayOnNext = false;
    } else {
      this.currentDisplay += key;
    }
    if (this.currentDisplay[0] === '0' && key !== ".") {
      this.currentDisplay = this.currentDisplay.slice(1, this.currentDisplay.length); 
    }
    
  }

  private clearDisplay(label: string): void {
    this.currentDisplay = '0';
    if (label === "AC") {
      for (let key of this.keyAttributes) {
        key.active = false;
      }
      this.storedValues = [];
    } else {
      this.keyAttributes[0].label = "AC"
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

  private changeActivation(operator: string): void {
    this.activeOperator = operator;
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
  private getPercent() {
    const lastStoredValue = this.storedValues[this.storedValues.length - 1];
    console.log(lastStoredValue);
    switch (lastStoredValue.operator) {
      case "+":
      case "-": 
        this.currentDisplay = (+this.currentDisplay * +lastStoredValue.value/100).toString();
        break;
      default:
        this.currentDisplay = (+lastStoredValue.value/100).toString();

    }
    
  }

  private evaluate() {
    let totalThusFar: number = 0;
    let nextOperation: string = "none";

    for (let storedValue of this.storedValues) {
      console.log(totalThusFar);
      if (nextOperation === 'none') {
        totalThusFar = +storedValue.value;
      } 
      nextOperation = storedValue.operator;
      switch (nextOperation) {
        case 'X':
          totalThusFar *= +this.currentDisplay;
          break;
        case '÷':
          totalThusFar /= +this.currentDisplay;
          break;
        case '+':
          totalThusFar += +this.currentDisplay;
          break;
        case '-':
          totalThusFar -= +this.currentDisplay;
          break;
      }
    }

    this.currentDisplay = totalThusFar.toString();
    for (let key of this.keyAttributes) {
      key.active = false;
    }
    this.clearDisplayOnNext = true;
    this.storedValues = this.storedValues.slice(-1);
    console.log(this.storedValues);
  }

}
