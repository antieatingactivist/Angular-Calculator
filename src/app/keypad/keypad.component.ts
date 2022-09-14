import { Component, OnInit  } from '@angular/core';
import { IKey } from '../shared/';


@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent implements OnInit {

  currentDisplay: string = "0";
  previousDisplay: string = "0";
  displayIsOn: boolean = true;
  activeOperator: string = "";
  clearDisplayOnNext: boolean = false;
  colors: Array<string> = ["#39393988", "#ff9f0a", "#5a5a5add"];

  keyAttributes: Array<IKey> = [
    {label: "AC", color: this.colors[0], width: 25, type: "clear", action: (label: string) => this.clearDisplay(label)}, 
    {label: "<span class='sup'>+</span>⁄<span class='sub'>-</span>", color: this.colors[0], width: 25, type: "changeSign", action: () => this.changeSign()}, 
    {label: "%", color: this.colors[0], width: 25, type: "percent", action: () => this.getPercent()}, 
    {label: "÷", color: this.colors[1], width: 25, type: "divide", active: false, action: () => this.changeActivation("divide")}, 
    {label: "7", color: this.colors[2], width: 25, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "8", color: this.colors[2], width: 25, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "9", color: this.colors[2], width: 25, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "✕", color: this.colors[1], width: 25, type: "multiply", active: false, action: () => this.changeActivation("multiply")}, 
    {label: "4", color: this.colors[2], width: 25, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "5", color: this.colors[2], width: 25, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "6", color: this.colors[2], width: 25, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "–", color: this.colors[1], width: 25, type: "subtract", active: false, action: () => this.changeActivation("subtract")}, 
    {label: "1", color: this.colors[2], width: 25, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "2", color: this.colors[2], width: 25, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "3", color: this.colors[2], width: 25, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "+", color: this.colors[1], width: 25, type: "add", active: false, action: () => this.changeActivation("add")}, 
    {label: "0", color: this.colors[2], width: 50, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: ".", color: this.colors[2], width: 25, type: "decimal", action: (label: string) => this.appendDisplay(label)}, 
    {label: "=", color: this.colors[1], width: 25, type: "equals", action: () => this.evaluate()}
  ]

  constructor() { }

  ngOnInit(): void {

  }

  private appendDisplay(key: string): void {
    this.keyAttributes[0].label = "C";
    if (this.currentDisplay.length < 30) {

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
      
      
  }

  private clearDisplay(label: string): void {
    this.updateDisplay("0", true);
    if (label === "AC") {
      for (let key of this.keyAttributes) {
        key.active = false;
        this.previousDisplay = "0";
      }
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
    for (let key of this.keyAttributes) {
      if (key.type === this.activeOperator) {
        key.active = true;
        this.clearDisplayOnNext = true;
        this.previousDisplay = this.currentDisplay;
      } else {
        key.active = false;
      }
    }

  }
  private getPercent() {
    this.updateDisplay(this.currentDisplay, true);
    switch (this.activeOperator) {
      case "add":
      case "subtract": 
        this.updateDisplay((+this.currentDisplay * +this.previousDisplay/100).toString());
        break;
      default:
        this.updateDisplay((+this.currentDisplay/100).toString());

    }
    
  }

  private evaluate() {
    const x = +this.previousDisplay;
    const y = +this.currentDisplay;
    if (!this.clearDisplayOnNext) {

      this.previousDisplay = this.currentDisplay;
    }

    switch (this.activeOperator) {
      case 'multiply':
        this.updateDisplay((x * y).toString(), true); 
        break;
      case 'divide':
        if (this.clearDisplayOnNext) {
          this.updateDisplay((y / x).toString(), true);
        } else {
          this.updateDisplay((x / y).toString(), true);
        }
        break;
      case 'add':
        this.updateDisplay((x + y).toString(), true); 
        break;
      case 'subtract':
        if (this.clearDisplayOnNext) {
          this.updateDisplay((-(x - y)).toString(), true); 
        } else {
          this.updateDisplay((x - y).toString(), true); 
        }
        break;
    }

    for (let key of this.keyAttributes) {
      key.active = false;
    }
    this.clearDisplayOnNext = true;
  }

  private updateDisplay(contents: string, flicker: boolean = false) {

    switch (contents) {
      case "NaN": this.currentDisplay = "e";
        break;
      case "Infinity": this.currentDisplay = "∞";
        break;
      default: this.currentDisplay = contents;
    }

    if (flicker) {
      this.displayIsOn = false;
      setTimeout(() => {
        this.displayIsOn = true;
      },50);
    }
  }

}
