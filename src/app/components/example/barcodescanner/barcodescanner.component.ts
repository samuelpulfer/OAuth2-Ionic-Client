import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import * as qq from 'quagga';

@Component({
  selector: 'app-barcodescanner',
  templateUrl: './barcodescanner.component.html',
  styleUrls: ['./barcodescanner.component.scss'],
})
export class BarcodescannerComponent implements OnInit {

  @ViewChild('captureinput', {static: false}) input;
  @Output() barcodeEvent;

  constructor() { 
    this.barcodeEvent = new EventEmitter<string>();
  }

  ngOnInit() {}

  scan() {
    this.input.nativeElement.click();
  }

  getInput(event) {
    console.log(event);
    let src = URL.createObjectURL(event.target.files[0]);
    qq.decodeSingle({
      src: src,
      numOfWorkers: 0,  // Needs to be 0 when used within node
      locate: true,
      inputStream: {
          size: 800  // restrict input-size to be 800px in width (long-side)
      },
      decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader",
            "2of5_reader",
            "code_93_reader"
          ] // List of active readers
        },
    }, result => {
      if(result != null && result.codeResult) {
        this.barcodeEvent.emit(result.codeResult.code);
      } else {
        console.log("Barcode not detected");
      }
    });
  }
}
