import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Books from './categories/Books';
import Music from './categories/Music';
import TV from './categories/TV';
import Places from './categories/Places';
import './navigation.css'; // Import your CSS file

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/music">Music</Link></li>
            <li><Link to="/tv">TV</Link></li>
            <li><Link to="/places">Places</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/books" component={Books} />
          <Route path="/music" component={Music} />
          <Route path="/tv" component={TV} />
          <Route path="/places" component={Places} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
