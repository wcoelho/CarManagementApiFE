import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarAddComponent } from './car-add/car-add.component';
import { CarEditComponent } from './car-edit/car-edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    //Rota para tela principal com lista de veículos cadastrados
    {
    path: 'veiculos',
    component: CarsComponent,
    data: { title: 'Recupera lista de Veiculos' }
    },
    //Rota para tela de detalhes de veículo
    {
    path: 'veiculo/:id',
    component: CarDetailComponent,
    data: { title: 'Recupera detalhes de Veiculo específico' }
    },
    //Rota para tela de adição de novo veículo
    {
    path: 'veiculo-novo',
    component: CarAddComponent,
    data: { title: 'Adiciona registro de Veiculo' }
    },
    //Rota para tela de atualização de veículo
    {
    path: 'veiculo-atualiza/:id',
    component: CarEditComponent,
    data: { title: 'Edita registro de Veiculo' }
    },
    //Rota para raiz => redireciona para lista de veiculos
    { path: '',
    redirectTo: '/veiculos',
    pathMatch: 'full'
    },
    //Rota para página não encontrada
    { 
      path: '**', 
      component: PageNotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
