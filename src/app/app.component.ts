import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    setInterval(() => {
      fetch('https://tfm-fraud-backend.onrender.com/transactions/ping');
    }, 10 * 60 * 1000); // cada 10 minutos
  }
}
