import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Cake } from 'src/app/model/cake.model';
import { CakesService } from 'src/app/service/cakes.service';

@Component({
  selector: 'app-cake-detail',
  templateUrl: './cake-detail.component.html',
  styleUrls: ['./cake-detail.component.css']
})
export class CakeDetailComponent implements OnInit {


  cakeId: number = 0;
  cake: Cake = new Cake();

  constructor(private service: CakesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.cakeId = params['cakeId']
      this.getCake();
    })
  }

  getCake(): void {
    this.service.getCake(this.cakeId).subscribe({
      next: (cake: Cake) => {
        this.cake = cake                
      },
      error: (err) => {console.log(err)}
    })
  }

}
