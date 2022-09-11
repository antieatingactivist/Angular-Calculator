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
  ngOnInit(): void {
  }
  getStyle(): object {
    return {
      fontSize: this.determineSize(),  
    }
  }
  private determineSize(): string {
    const x = this.currentDisplay.length;
    switch (true) {
      case (x > 26): return '14px';
      case (x > 21): return '16px';
      case (x > 14): return '20px';
      case (x > 10): return '30px';
      case (x > 8): return '40px';
      default: return '50px';
    }
    
  }

}
