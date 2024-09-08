import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  userName: string | null = '';

  constructor() { }

  ngOnInit() {
    // Recuperar el nombre del usuario desde localStorage
    this.userName = localStorage.getItem('userName');
  }
}


