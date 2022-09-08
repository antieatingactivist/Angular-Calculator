import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent implements OnInit {

  keyAttributes: Array<any> = [
    {label: "AC", color: "#2b2a36"}, 
    {label: "±", color: "#2b2a36"}, 
    {label: "%", color: "#2b2a36"}, 
    {label: "÷", color: "#fd8d08"}, 
    {label: "7", color: "#4a4952"}, 
    {label: "8", color: "#4a4952"}, 
    {label: "9", color: "#4a4952"}, 
    {label: "X", color: "#fd8d08"}, 
    {label: "4", color: "#4a4952"}, 
    {label: "5", color: "#4a4952"}, 
    {label: "6", color: "#4a4952"}, 
    {label: "-", color: "#fd8d08"}, 
    {label: "1", color: "#4a4952"}, 
    {label: "2", color: "#4a4952"}, 
    {label: "3", color: "#4a4952"}, 
    {label: "+", color: "#fd8d08"}, 
    {label: "0", color: "#4a4952"}, 
    {label: ".", color: "#4a4952"}, 
    {label: "=", color: "#fd8d08"}
  ]

  constructor() { }

  ngOnInit(): void {

  }

}
