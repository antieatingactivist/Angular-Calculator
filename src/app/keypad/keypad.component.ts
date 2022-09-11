import { Component, OnInit  } from '@angular/core';
import { IKey, IOperation } from '../shared/';


@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent implements OnInit {

  currentDisplay: string = "0";
  displayIsOn: boolean = true;
  activeOperator: string = "";
  storedValues: IOperation[] = [];
  clearDisplayOnNext: boolean = false;
  colors: Array<string> = ["#39393988", "#ff9f0a", "#5a5a5add"]

  keyAttributes: Array<IKey> = [
    {label: "AC", color: this.colors[0], width: 65, type: "clear", action: (label: string) => this.clearDisplay(label)}, 
    {label: "±", color: this.colors[0], width: 65, type: "changeSign", action: () => this.changeSign()}, 
    {label: "%", color: this.colors[0], width: 65, type: "percent", action: () => this.getPercent()}, 
    {label: "÷", color: this.colors[1], width: 65, type: "divide", active: false, action: (label: string) => this.changeActivation(label)}, 
    {label: "7", color: this.colors[2], width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "8", color: this.colors[2], width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "9", color: this.colors[2], width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "x", color: this.colors[1], width: 65, type: "multiply", active: false, action: (label: string) => this.changeActivation(label)}, 
    {label: "4", color: this.colors[2], width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "5", color: this.colors[2], width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "6", color: this.colors[2], width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "-", color: this.colors[1], width: 65, type: "subtract", active: false, action: (label: string) => this.changeActivation(label)}, 
    {label: "1", color: this.colors[2], width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "2", color: this.colors[2], width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "3", color: this.colors[2], width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "+", color: this.colors[1], width: 65, type: "add", active: false, action: (label: string) => this.changeActivation(label)}, 
    {label: "0", color: this.colors[2], width: 130, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: ".", color: this.colors[2], width: 65, type: "decimal", action: (label: string) => this.appendDisplay(label)}, 
    {label: "=", color: this.colors[1], width: 65, type: "equals", action: () => this.evaluate()}
  ]

  constructor() { }

  ngOnInit(): void {

  }

  private appendDisplay(key: string): void {
    this.keyAttributes[0].label = "C";
    if (this.currentDisplay === '0' && key !== ".") {
      this.updateDisplay(this.currentDisplay.slice(1, this.currentDisplay.length)); 
    }
    if (this.clearDisplayOnNext) {
      this.clearDisplayOnNext = false;
      if (key === ".") {
        this.updateDisplay("0.");
      } else {
        this.updateDisplay(key);
      }
    } else if (!(this.currentDisplay.includes(".") && key === ".")/* && this.currentDisplay.length < 8 */) { 
        this.updateDisplay(this.currentDisplay + key); 
    } else {
        this.updateDisplay(this.currentDisplay, true); 
    }

    
  }

  private clearDisplay(label: string): void {
    this.updateDisplay("0", true);
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
        this.updateDisplay(`-${this.currentDisplay}`, true);
      } else {
        this.updateDisplay((this.currentDisplay.slice(1, this.currentDisplay.length)), true); 
      }
    }
  }

  private changeActivation(operator: string): void {
    this.updateDisplay(this.currentDisplay, true);
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
    this.updateDisplay(this.currentDisplay, true);
    const lastStoredValue = this.storedValues[this.storedValues.length - 1];
    console.log(lastStoredValue);
    switch (lastStoredValue.operator) {
      case "+":
      case "-": 
        this.updateDisplay((+this.currentDisplay * +lastStoredValue.value/100).toString());
        break;
      default:
        this.updateDisplay((+lastStoredValue.value/100).toString());

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
        case 'x':
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

    this.updateDisplay(totalThusFar.toString(), true);
    for (let key of this.keyAttributes) {
      key.active = false;
    }
    this.clearDisplayOnNext = true;
    this.storedValues = this.storedValues.slice(-1);
    console.log(this.storedValues);
  }

  private updateDisplay(contents: string, flicker: boolean = false) {
    this.currentDisplay = contents;
    if (flicker) {
      this.displayIsOn = false;
      setTimeout(() => {
        this.displayIsOn = true;
      },50);
    }
  }

}
