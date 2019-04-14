import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarAddComponent } from './car-add/car-add.component';
import { CarEditComponent } from './car-edit/car-edit.component';

const routes: Routes = [
    {
    path: 'cars',
    component: CarsComponent,
    data: { title: 'Recupera lista de Veiculos' }
    },
    {
    path: 'car-details/:id',
    component: CarDetailComponent,
    data: { title: 'Recupera detalhes de Veiculo específico' }
    },
    {
    path: 'car-add',
    component: CarAddComponent,
    data: { title: 'Adiciona registro de Veiculo' }
    },
    {
    path: 'car-edit/:id',
    component: CarEditComponent,
    data: { title: 'Edita registro de Veiculo' }
    },
    { path: '',
    redirectTo: '/cars',
    pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
