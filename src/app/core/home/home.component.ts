import { Component, OnInit } from '@angular/core';
import { SlideShow } from 'src/app/model/slideshow.model';
import { CakesService } from 'src/app/service/cakes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slideShow: SlideShow[] = [];

  constructor(private service: CakesService) { }

  ngOnInit(): void {
    this.getSlideShow();
  }

  getSlideShow(): void {
    this.service.getSlideshow().subscribe({
      next: (result: SlideShow[]) => {
        this.slideShow = result;
        console.log(this.slideShow);
        
      },
      error: (err: any) => { console.log(err) }
    })
  }

}
