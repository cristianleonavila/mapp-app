import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @ViewChild('minimap') minimap?: ElementRef;

  private map?: Map;

  @Input() lngLat?: [number, number];

  ngAfterViewInit(): void {

    if ( !this.minimap ) throw 'No se encontró el mapa';

    if ( !this.lngLat ) throw 'No se encontraron las coordenadas';

    this.map = new Map({
      container: this.minimap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 6, // starting zoom
      interactive: false

      });      
      const marker = new Marker({
        color: 'red'
      }).setLngLat(this.lngLat).addTo(this.map); 
  }
}
