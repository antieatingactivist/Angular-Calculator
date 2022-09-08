import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IKey } from '../shared/button.model';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent implements OnInit {

  // @Output() updateDisplay = new EventEmitter<string>();
  currentDisplay: string = "0";
  keyAttributes: Array<IKey> = [
    {label: "AC", color: "#2b2a36", width: 65, type: "clear"}, 
    {label: "±", color: "#2b2a36", width: 65, type: "changeSign"}, 
    {label: "%", color: "#2b2a36", width: 65, type: "percent"}, 
    {label: "÷", color: "#fd8d08", width: 65, type: "divide"}, 
    {label: "7", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "8", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "9", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "X", color: "#fd8d08", width: 65, type: "multiply"}, 
    {label: "4", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "5", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "6", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "-", color: "#fd8d08", width: 65, type: "subtract"}, 
    {label: "1", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "2", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "3", color: "#4a4952", width: 65, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: "+", color: "#fd8d08", width: 65, type: "add"}, 
    {label: "0", color: "#4a4952", width: 140, type: "number", action: (label: string) => this.appendDisplay(label)}, 
    {label: ".", color: "#4a4952", width: 65, type: "decimal", action: (label: string) => this.appendDisplay(label)}, 
    {label: "=", color: "#fd8d08", width: 65, type: "equals"}
  ]

  constructor() { }

  ngOnInit(): void {

  }

  appendDisplay(key: string): void {
    this.currentDisplay += key;
    console.log(this.currentDisplay);
    // this.updateDisplay.emit(this.currentDisplay);
    
  }


}
