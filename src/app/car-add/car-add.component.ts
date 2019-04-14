import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.scss']
})
export class CarAddComponent implements OnInit {

  carForm: FormGroup;
  placa:string='';
  chassi:string='';
  renavam:string='';
  modelo:string='';
  marca:string='';
  ano:number=null;

  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {   
    this.carForm = this.formBuilder.group({
      'placa' : [null, Validators.required],
      'chassi' : [null, Validators.required],
      'renavam' : [null, Validators.required],
      'modelo' : [null, Validators.required],
      'marca' : [null, Validators.required],
      'ano' : [null, Validators.required]
    }); 
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.addCar(form)
      .subscribe(res => {
          let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/veiculos', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
    }



}
