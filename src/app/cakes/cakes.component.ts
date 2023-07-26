import { Component, OnInit } from '@angular/core';
import { CakesService } from '../service/cakes.service';
import { Cake } from '../model/cake.model';

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css']
})
export class CakesComponent implements OnInit {

  cakes: Cake[] = [];
  ingredients: string[] = [];

  params = {
    sort: 'name',
    sortDirection: 'asc',
    filter: {
      ingredients: '',
    },
  };

  constructor(private service: CakesService) { }

  ngOnInit(): void {
    this.getCakes();
    this.getIngredients();
  }

  getCakes(){
    this.service.getCakes(this.params).subscribe({
      next: (cakes: Cake[]) => {
        this.cakes = cakes;        
      },
      error: (err: any) => { console.log(err) }
    })
  }

  getIngredients(){
    this.service.getIngredients().subscribe({
      next: (result: string[]) => {
        this.ingredients = result;            
      },
      error: (err: any) => { console.log(err) }
    })
  }

  onSortChange(event: any){
    this.params.filter.ingredients = event.target.value;
    this.getCakes();    
  }
}
