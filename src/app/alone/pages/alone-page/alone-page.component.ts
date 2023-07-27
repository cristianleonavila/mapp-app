import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../../components/counter/counter.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'app-alone-page',
  standalone: true,
  imports: [
    CommonModule,
    CounterComponent,
    SideMenuComponent
  ],
  templateUrl: './alone-page.component.html',
  styleUrls: ['./alone-page.component.css']
})

export class AlonePageComponent {

}
