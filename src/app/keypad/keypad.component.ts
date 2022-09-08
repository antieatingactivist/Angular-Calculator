import { Component, OnInit } from '@angular/core';
import { IKey } from '../shared/button.model';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent implements OnInit {

  

  keyAttributes: Array<IKey> = [
    {label: "AC", color: "#2b2a36", width: 65, type: "clear"}, 
    {label: "±", color: "#2b2a36", width: 65, type: "changeSign"}, 
    {label: "%", color: "#2b2a36", width: 65, type: "percent"}, 
    {label: "÷", color: "#fd8d08", width: 65, type: "divide"}, 
    {label: "7", color: "#4a4952", width: 65, type: "number"}, 
    {label: "8", color: "#4a4952", width: 65, type: "number"}, 
    {label: "9", color: "#4a4952", width: 65, type: "number"}, 
    {label: "X", color: "#fd8d08", width: 65, type: "multiply"}, 
    {label: "4", color: "#4a4952", width: 65, type: "number"}, 
    {label: "5", color: "#4a4952", width: 65, type: "number"}, 
    {label: "6", color: "#4a4952", width: 65, type: "number"}, 
    {label: "-", color: "#fd8d08", width: 65, type: "subtract"}, 
    {label: "1", color: "#4a4952", width: 65, type: "number"}, 
    {label: "2", color: "#4a4952", width: 65, type: "number"}, 
    {label: "3", color: "#4a4952", width: 65, type: "number"}, 
    {label: "+", color: "#fd8d08", width: 65, type: "add"}, 
    {label: "0", color: "#4a4952", width: 140, type: "number"}, 
    {label: ".", color: "#4a4952", width: 65, type: "decimal"}, 
    {label: "=", color: "#fd8d08", width: 65, type: "equals"}
  ]

  constructor() { }

  ngOnInit(): void {

  }


}
