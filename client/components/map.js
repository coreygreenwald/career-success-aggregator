import React, {Component} from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1Ijoia21hY3BoZXIxOSIsImEiOiJjamE5cGVuaWIwa2VsMzNsaWxvdDJvM3ZoIn0.DHYid3XVXt70jWyGreRY3w'

class Map extends Component {

  constructor() {
    super()
    this.state = {
      lng: -100,
      lat: 40,
      zoom: 4.0
    };
  }
  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  componentWillUnmount() {
    this.map.remove()
  }
  render() {

    const style = {
      width: '100%',
      height: '500px',
      display: 'block'
    };

    const { lng, lat, zoom } = this.state;

    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 ">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div style={style} ref={el => this.mapContainer = el}/>
      </div>
    );
  }
}

export default Map
