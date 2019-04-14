import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api/api.service';
import { Car } from '../../schema/car';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  displayedColumns: string[] = [ 'placa', 'chassi','renavam','modelo','marca','ano'];

  data: Car[] = [];
  isLoadingResults = true;
  hasError = false;
  errorMessage = '';
  
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getCars()
      .subscribe(res => {
        
        if(res["erro"]!=null)
        {
          console.error(res["erro"]);
          this.data = [];
          this.hasError = true;
          this.errorMessage = res["erro"]
        }
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
