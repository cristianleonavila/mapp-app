import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'src/app/maps/components/interfaces/menu-item';


@Component({
  standalone: true,
  imports: [
    CommonModule, RouterModule
  ],
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  
  private menu: MenuItem[] = [
    {route: '/maps/full-screen', name: 'Full Screen'},
    {route: '/maps/zoom-range', name: 'Zoom Range'},
    {route: '/maps/markers', name: 'Markers'},
    {route: '/maps/properties', name: 'Houses'}
  ];

  get menuItems():MenuItem[] {
    return this.menu;
  }
}
