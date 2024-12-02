import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  public title: string = 'Welcome to Luffy Task Organizer';

  constructor(private animationService: AnimationService) { 
    
  }

  ngOnInit(): void {  
    this.animationService.createLuffyAnimation();
  }

}
