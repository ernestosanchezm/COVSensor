import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  image1 = "assets/oficina.webp";
  image2 = "assets/sensored.webp";
  image3 = "assets/medidor.jpg";

  constructor(private location: Location) {}

  ngOnInit(): void {}

  goToLogin() {}
}
