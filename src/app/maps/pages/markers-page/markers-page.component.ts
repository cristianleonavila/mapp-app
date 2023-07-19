import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerInfo {
  index: number,
  color: string;
  marker: Marker;
}


interface PlainMarker {
  index: number,
  color: string;
  lngLat: number[]
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})

export class MarkersPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('markers') markers?: ElementRef;

  public currentZoom:number = 13;

  private map?: Map;

  public currentCenter = new LngLat(-74.10, 4.65);  

  public markerList: MarkerInfo[] = [];

  ngAfterViewInit(): void {
    if ( !this.markers ) throw 'El elemento HTML no fué encontrado';
    
    this.map = new Map({
      container: this.markers?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.currentZoom, // starting zoom
    });  
    
    const marker = new Marker({
      color: 'red'
    }).setLngLat(this.currentCenter).addTo(this.map);  

    this.loadMarkers();
  }


  ngOnDestroy(): void {
    this.map?.remove();
  } 

  createMarker() {
    if ( !this.map ) return;
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    this.addMarker(this.map.getCenter(), color);
  }
  
  addMarker(lngLat: LngLat, color: string) {
    if ( !this.map ) return;
    const marker = new Marker({
      color,
      draggable: true
    }).setLngLat(lngLat).addTo(this.map);
    let index = this.markerList.length;
    this.markerList.push({index , color, marker});
    marker.on('dragend', () => this.saveMarkers());
    this.saveMarkers();
  }

  deleteMarker(i:number) {
    console.log(i);
    this._removeMarkerAt(i);
    //const marker = this.markerList[i].marker.remove();
    this.markerList = this.markerList.filter( (item) => item.index !== i );
    this._deleteMarkerFromStorage(i);
  }

  private _removeMarkerAt(i:number) {
    const markerInfo: MarkerInfo[] = this.markerList.filter((item) => item.index === i);
    if ( markerInfo.length ) {
      markerInfo[0].marker.remove();
    }
    
  }

  flyTo( marker: Marker ) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });
  }

  private _deleteMarkerFromStorage(index:number) {
    const rawMarkers = localStorage.getItem('savedMarkers') || '[]';
    const markers: PlainMarker[] = JSON.parse(rawMarkers);
    const newMarkerList: PlainMarker[] = markers.filter( (item) => item.index !== index);
    this._saveMarkersInLocalStorage(newMarkerList);
  }

  saveMarkers() {
    const plainMarkers: PlainMarker[] = this.markerList.map( ({index, color, marker}) => {
      return {
        index,
        color, 
        lngLat: marker.getLngLat().toArray()
      };
    });
    this._saveMarkersInLocalStorage(plainMarkers);
  }

  private _saveMarkersInLocalStorage(plainMarkers: PlainMarker[]) {
    localStorage.setItem('savedMarkers', JSON.stringify(plainMarkers));
  }

  loadMarkers() {
    const rawSavedMarkers = localStorage.getItem('savedMarkers') || '[]';
    const savedMarkers: PlainMarker[] = JSON.parse(rawSavedMarkers);
    savedMarkers.forEach( ({color, lngLat}) => {
      const [lng, lat] = lngLat;
      this.addMarker( new LngLat(lng, lat), color);
    });
    
  }
}
