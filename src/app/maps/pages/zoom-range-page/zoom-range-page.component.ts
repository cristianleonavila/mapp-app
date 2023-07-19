import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('zoomMap') zoomMap?: ElementRef;

  @ViewChild('currentZoomValue') currentZoomValue?: ElementRef;

  public currentZoom:number = 12;

  private map?: Map;

  public currentCenter = new LngLat(-74.10, 4.65);

  ngAfterViewInit(): void {

    if ( !this.zoomMap ) throw 'El elemento HTML no fué encontrado';
    
    this.map = new Map({
      container: this.zoomMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.currentZoom, // starting zoom
    });    
    this.mapListener();
  }

  ngOnDestroy(): void {
    console.log('Inicializando mapa');
    this.map?.remove();
  }

  public zoomIn() {
    this.map?.zoomIn();
    
  }

  public zoomOut() {
    this.map?.zoomOut();
  }  

  protected mapListener() {
    if ( !this.map ) throw 'Mapa no inicializado';

    this.map.on('zoom', (event) => {
      this.currentZoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (event) => {
      if ( this.map!.getZoom() < 18 ) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentCenter = this.map!.getCenter();
      console.log(this.currentCenter);
      
    });
  }
}
