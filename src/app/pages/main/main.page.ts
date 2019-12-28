import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { LocalPersistenceService } from '../../services/local-persistence.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  public example: String = "";

  constructor(private logger: LoggerService, private persistence: LocalPersistenceService) { 
    this.example = this.persistence.getExampleData();
  }

  ngOnInit() {
  }

  btn_pressed() {
    this.logger.info("Button pressed");
    this.persistence.setExampleData(this.example);
  }

}
