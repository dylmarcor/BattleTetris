import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './TopScoresPage.css'
import topscoresAPI from '../../utils/topscoresAPI'
import ScoresTable from '../ScoresTable/ScoresTable'

class TopScoresPage extends Component {
  constructor() {
    super();
    this.state = {
      points: []
    }
  }
  componentDidMount() {
    topscoresAPI.index().then(scores => {
      this.setState({scores})
    });
  }
  render() {
    return (
      <div className='TopScoresPage'>
        <header className="header-footer">Top Scores</header>
        <Link to='/'>RETURN</Link><br />
      </div>
    );
  }
}

export default TopScoresPage