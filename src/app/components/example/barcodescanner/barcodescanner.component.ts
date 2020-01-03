import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-barcodescanner',
  templateUrl: './barcodescanner.component.html',
  styleUrls: ['./barcodescanner.component.scss'],
})
export class BarcodescannerComponent implements OnInit {

  @ViewChild('captureinput', {static: false}) input;
  @Output() barcodeEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  scan() {
    this.input.nativeElement.click();
  }

  getInput(event) {
    console.log(event);

    let barcode = "243345"
    this.barcodeEvent.emit(barcode);
  }

}
