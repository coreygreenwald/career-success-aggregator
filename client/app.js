import React from 'react'
import axios from 'axios'

import {Search, Map} from './components'
// import Routes from './routes'

class App extends React.Component {
  state = {
    jobs: [],
    loading: false
  }

  // later get from search bar
  async componentDidMount() {
    try {
      this.setState({loading: true})
      const { data } = await axios.get('/api/jobs')
      this.setState({ jobs: data})
      console.log(data)
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
