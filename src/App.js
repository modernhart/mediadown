import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from 'react-redux'

import Home from './components/Home';
import MediaDown from './components/MediaDown';
import MediaDetail from './components/MediaDetail';
import ArtistList from './components/ArtistList';
import MeUiAlert from './components/common/MeUiAlert';
import ProgressLoader from './components/common/ProgressLoader';
import { requestServer } from './action'

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css'; 
import './App.css'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(requestServer())
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/video/download" component={MediaDown} />
          <Route exact path="/artist/list" component={ArtistList} />
          <Route exact path="/artist/detail/:name" component={MediaDetail} />
          {/* <Route exact path="/upload/cover" component={CoverUpload} /> */}
          <Route exact path='*' render={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
      <MeUiAlert />
      <ProgressLoader />
    </div>
  );
}

export default App;
