import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor() { }
  @Input() currentDisplay: string = "";
  @Input() isOn: boolean = true;
  physicalWidth: number = 0;

  ngOnInit(): void {
  }
  getStyle(): object {
    const split = this.currentDisplay.split('');
    this.physicalWidth = 0;
    for(let digit of split) {
      switch (digit) {
        case '1': this.physicalWidth+=7;
          break;
        case '.': this.physicalWidth+=4;
          break;
        default: this.physicalWidth+=10;
      }
    }
    console.log("WIDTH: ", this.physicalWidth);
    return {
      fontSize: this.determineSize(),  
    }
  }
  private determineSize(): string {
    const x = this.physicalWidth;
    switch (true) {
      case (x > 220): return '.8em';
      case (x > 180): return '1.1em';
      case (x > 140): return '1.4em';
      case (x > 110): return '1.8em';
      case (x > 80): return '2.3em';
      default: return '3em';
    }
    
  }

}
