import { Component, Input, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css'],
})
export class ProgressSpinnerComponent implements OnInit {
  @Input() value: number = 100;
  @Input() diameter: number = 100;
  @Input() mode: ProgressSpinnerMode = 'indeterminate';
  @Input() strokeWidth: number = 10;
  @Input() overlay: boolean = false;
  @Input() color: string = 'primary';
  constructor() {}

  ngOnInit(): void {}
}
