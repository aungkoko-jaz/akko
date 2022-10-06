import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../../../core/models/hero';
import { HeroService } from '../../../core/services/hero.service';
import { MessageService } from '../../../core/services/message.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => {
      if (hero !== undefined) {
        this.hero = hero;
        this.messageService.add(`Fetched ${hero.Name} detail success.`);
      }
    });
  }

  goBack(): void {
    this.location.back();
    this.messageService.clear()
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe((result) => {
        if (result !== undefined) {
          this.messageService.add('Hero detail update successfully.');
        }
      });
    }
  }
}
