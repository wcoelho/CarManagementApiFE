import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit {

  carForm: FormGroup;
  car_id:number=null;
  placa:string='';
  chassi:string='';
  renavam:string='';
  modelo:string='';
  marca:string='';
  ano:number=null;
  isLoadingResults = false;
  
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCar(this.route.snapshot.params['id']);
    this.carForm = this.formBuilder.group({
      'placa' : [null, Validators.required],
      'chassi' : [null, Validators.required],
      'renavam' : [null, Validators.required],
      'modelo' : [null, Validators.required],
      'marca' : [null, Validators.required],
      'ano' : [null, Validators.required]
    });
  }

  getCar(id: number) {
    this.api.getCar(id).subscribe(data => {
      this.car_id = data.id;
      this.carForm.setValue({
        placa: data.placa,
        chassi: data.chassi,
        renavam: data.renavam,
        modelo: data.modelo,
        marca: data.marca,
        ano: data.ano
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.updateCar(this.car_id, form)
      .subscribe(res => {
          let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/veiculo', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  carDetails() {
    this.router.navigate(['/veiculo', this.car_id]);
  }


}
