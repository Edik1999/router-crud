import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/HomePage';
import NewPost from './components/NewPost';
import Post from './components/Post';


function App() {
  return (
    <Router>
      <div className="page">
        <Switch>
          <Route path="/posts/new" component={NewPost} />
          <Route path="/posts/" component={Post} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
