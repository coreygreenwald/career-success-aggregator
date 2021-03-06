import React, {Component} from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1Ijoia21hY3BoZXIxOSIsImEiOiJjamE5cGVuaWIwa2VsMzNsaWxvdDJvM3ZoIn0.DHYid3XVXt70jWyGreRY3w'

class Map extends Component {

  constructor() {
    super()
    this.state = {
      lng: -100,
      lat: 40,
      zoom: 3.0
    };
  }
  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lng, lat],
      zoom
    });

    this.setState({map})


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
    this.state.map.remove()
  }

  render() {

    const style = {
      width: '100%',
      height: '100vh',
      display: 'block'
    };

    const { lng, lat, zoom } = this.state;

    const {jobs} = this.props;

    for (let k in jobs){
      let coords = JSON.parse(`[${k}]`);

      let url = jobs[k][0].refs.landing_page;
      let numJobs = jobs[k].length;
      // console.log(coords, 'number: ', jobs[k].length)
      let lat = Number(coords[0]);
      let lng = Number(coords[1]);
      // console.log(lat, lng);
      coords = new mapboxgl.LngLat(lng,lat + 30)
      var el = document.createElement('div');
      if(numJobs < 5){
        el.className = 'marker-small';
      } else if(numJobs < 20){
        el.className = 'marker';
      } else {
        el.className = 'marker-large';
      }
      try {
        new mapboxgl.Marker(el)
        .setLngLat(coords)
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML('<h1> HI  WHERE IS THIS ????</h1>'))
        .addTo(this.state.map);
      } catch(err) {
        console.log(err)
      }
      // }
    }

    //job[0].location.coordinates
    // Object.keys(jobs).forEach(coord => {
    //   var el = document.createElement('div');
    //   el.className = 'marker';
    //   new mapboxgl.Marker(el)
    //   .setLngLat(job[coord][0].location.coordinates)
    //   .addTo(this.state.map);
      //based on number, change sytling to make larger

      // make a markser for each feature and add to the map
      // console.log('hiiiiiii', jobs[coord][0].location.coordinates)
      // if( jobs[coord][0].location.coordinates[0] > -90 && jobs[coord][0].location.coordinates[1] && jobs[coord][0].location.coordinates[0] < 90 && jobs[coord][0].location.coordinates[1] < 90) {
      //   new mapboxgl.Marker(el)
      //   .setLngLat(jobs[coord][0].location.coordinates)
      //   .addTo(this.state.map);
      // }


    // })

    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 ">
          {/* <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div> */}
        </div>
        <div style={style} ref={el => this.mapContainer = el}/>
      </div>
    );
  }
}

export default Map
