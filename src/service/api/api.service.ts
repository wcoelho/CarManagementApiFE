import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { Car } from '../../schema/car';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

// URL base para acesso à API
const apiUrl = "http://localhost:8000/api/v1/veiculos";

@Injectable({
  providedIn: 'root'
})
/* Serviços associados ao CRUD */
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: Pode-se enviar o erro a um sistema de log no futuro
      // Por enquanto, vamos gerar um log de erro
      console.error(error);
  
      // Aplicação continua rodando e retorna resultado vazio
      return of(result as T);
    };
  }

  getCars (): Observable<Car[]> {
    return this.http.get<Car[]>(apiUrl)
      .pipe(
        tap(cars => console.log('Recuperada lista de veículos')),
        catchError(this.handleError('Erro ao tentar recuperar lista de veículos', []))
      );
  }
  
  getCar(id: number): Observable<Car> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Car>(url).pipe(
      tap(_ => console.log(`Recuperados dados do veículo com id ${id}`)),
      catchError(this.handleError<Car>(`Erro ao tentar recuperar veículo com id ${id}`))
    );
  }

  addCar (car: NgForm): Observable<Car> {
    return this.http.post<Car>(apiUrl, car, httpOptions).pipe(
      tap((car: Car) => console.log(`Adicionado veículo com id=${car.id}`)),
      catchError(this.handleError<Car>('Erro ao tentar adicionar veículo'))
    );
  }
  
  updateCar (id: number, car: NgForm): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put<Car>(url, car, httpOptions).pipe(
      tap(_ => console.log(`Dados do veículo com id=${id} atualizados`)),
      catchError(this.handleError<any>(`Erro ao tentar atualizar dados do veículo com id ${id}`))
    );
  }
  
  deleteCar (id: number): Observable<Car> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Car>(url, httpOptions).pipe(
      tap(_ => console.log(`Registro do veículo com id=${id} apagado`)),
      catchError(this.handleError<Car>(`Erro ao tentar apagar o registro do veículo com id ${id}`))
    );
  }
}
