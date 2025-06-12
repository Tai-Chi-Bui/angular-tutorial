import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalsService } from '../services/animals';
import { Animal, ApiResponse } from '../services/types';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  animals: Animal[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private animalsService: AnimalsService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('Home component constructed');
  }

  ngOnInit() {
    console.log('Home component initialized');
    this.loadAnimals();
  }

  loadAnimals() {
    this.loading = true;
    this.error = null;
    console.log('Starting to load animals...');

    this.animalsService.getAll().subscribe({
      next: (response: ApiResponse<Animal[]>) => {
        console.log('Received response:', response);
        if (response.data) {
          this.animals = response.data;
          console.log('Animals loaded:', this.animals);
          console.log('Animals array length:', this.animals.length);
          console.log('First animal:', this.animals[0]);
        } else {
          console.log('No data in response');
          this.animals = [];
        }
        this.loading = false;
        console.log('Loading state:', this.loading);
        console.log('Error state:', this.error);
        this.cdr.detectChanges(); // Force change detection
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error loading animals:', err);
        console.error('Error details:', {
          status: err.status,
          statusText: err.statusText,
          error: err.error,
          message: err.message
        });
        
        if (err.status === 0) {
          this.error = 'Cannot connect to the server. Please check if the server is running.';
        } else {
          this.error = `Error loading animals: ${err.message}`;
        }
        this.loading = false;
        console.log('Error state after error:', this.error);
        this.cdr.detectChanges(); // Force change detection
      }
    });
  }
}
