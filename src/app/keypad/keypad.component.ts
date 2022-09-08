import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent implements OnInit {

  keyAttributes: Array<any> = [
    {label: "AC", color: "#2b2a36", width: "65"}, 
    {label: "±", color: "#2b2a36", width: "65"}, 
    {label: "%", color: "#2b2a36", width: "65"}, 
    {label: "÷", color: "#fd8d08", width: "65"}, 
    {label: "7", color: "#4a4952", width: "65"}, 
    {label: "8", color: "#4a4952", width: "65"}, 
    {label: "9", color: "#4a4952", width: "65"}, 
    {label: "X", color: "#fd8d08", width: "65"}, 
    {label: "4", color: "#4a4952", width: "65"}, 
    {label: "5", color: "#4a4952", width: "65"}, 
    {label: "6", color: "#4a4952", width: "65"}, 
    {label: "-", color: "#fd8d08", width: "65"}, 
    {label: "1", color: "#4a4952", width: "65"}, 
    {label: "2", color: "#4a4952", width: "65"}, 
    {label: "3", color: "#4a4952", width: "65"}, 
    {label: "+", color: "#fd8d08", width: "65"}, 
    {label: "0", color: "#4a4952", width: "140"}, 
    {label: ".", color: "#4a4952", width: "65"}, 
    {label: "=", color: "#fd8d08", width: "65"}
  ]

  constructor() { }

  ngOnInit(): void {

  }

}
