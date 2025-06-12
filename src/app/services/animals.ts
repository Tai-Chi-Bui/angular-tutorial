import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';
import { Animal, ApiResponse } from './types';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  private readonly endpoint = '/animals';

  constructor(private api: Api) {}

  // Get all animals
  getAll(): Observable<ApiResponse<Animal[]>> {
    return this.api.get<Animal[]>(this.endpoint);
  }

  // Get a single animal by ID
  getById(id: number): Observable<ApiResponse<Animal>> {
    return this.api.get<Animal>(`${this.endpoint}/${id}`);
  }

  // Create a new animal
  create(animal: Partial<Animal>): Observable<ApiResponse<Animal>> {
    return this.api.post<Animal>(this.endpoint, animal);
  }

  // Update an existing animal
  update(id: number, animal: Partial<Animal>): Observable<ApiResponse<Animal>> {
    return this.api.put<Animal>(`${this.endpoint}/${id}`, animal);
  }

  // Delete an animal
  delete(id: number): Observable<ApiResponse<void>> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
