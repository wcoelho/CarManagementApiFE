import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api/api.service';
import { Car } from '../../schema/car';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {

  car: Car = { id: null, placa: '', chassi: '', renavam: '', modelo: '', marca: '', ano: null };
  isLoadingResults = true;
  
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getCarDetails(this.route.snapshot.params['id']);
  }

  // Busca registro do veículo específico
  getCarDetails(id: number) {
    this.api.getCar(id)
      .subscribe(data => {
        this.car = data;
        console.log(this.car);
        this.isLoadingResults = false;
      });
  }

  // Apaga registro do veículo específico
  deleteCar(id: number) {
    if(confirm("Quer mesmo apagar o registro?")) {
      this.isLoadingResults = true;
      this.api.deleteCar(id)
        .subscribe(res => {
            this.isLoadingResults = false;
            this.router.navigate(['/veiculos']);
          }, (err) => {
            console.log(err);
            this.isLoadingResults = false;
          }
        );
    }
  }

}
