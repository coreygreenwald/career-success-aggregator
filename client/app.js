import React from 'react'
import axios from 'axios'
import _ from 'lodash'

import {Search, Map} from './components'
// import Routes from './routes'

class App extends React.Component {
  state = {
    jobs: []
  }


  // later get from search bar
  async componentDidMount() {
    try {
      this.setState({loading: true})
      const { data } = await axios.get('/api/jobs')
      const grouped = _.groupBy(data, (elem) => elem.location.coordinates)
      console.log(grouped)
      this.setState({ jobs: grouped})
    } catch(err) {
      console.log(err)
    }
  }

  //pass map the filtered stuff - groupBy xip

  render() {

    return (
      <div>
        {/* <Navbar /> */}
        <Search />
        <Map {...this.state}/>
      </div>
    )
  }

}

export default App
