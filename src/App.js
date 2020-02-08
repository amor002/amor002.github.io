import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, useHistory, Switch} from 'react-router-dom';
import './App.css';
import NavBar from './ navbar/navbar';
import burger from './burger.svg';
import examples from './data.json';
import Card from './card.js';
import About from './about.js';

//const APP_ID = "89f8c72a";
//const APP_KEY = "fd1f83363351bb09ce23552830cdedef";
/*********
 * 
 * 
 * god is seing you right now
 * 
 * ******** */
//var format = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;
// https://api.edamam.com/search?q=chicken&app_id=89f8c72a&app_key=fd1f83363351bb09ce23552830cdedef&from=0&to=6


const centeredStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
};

const Home = () => {
  return (
    <div className="container">
      <div className="home">
        <div>
          <h1>Home Page</h1>
          <div>
            <p>here you can pick up any recipe you want easly with react !</p>
            <p>we provides the best service by using React library</p>
          </div>
        </div>
        <img src={burger} alt="img"/>
        
      </div>
    </div>
  );
}

const Popular = () => {
  const data = examples.hits;
  return (
  <div className="container">
      <h1>Popular chicken dishes</h1>
      <div className="card-container">
        {data.map((x, i) => <Card key={i} recipe={x.recipe} i={i}/>)}
      </div>
  </div>
  
  );
  
}

const Search = ({match}) => {
  const [data, setData] = useState([]);
  const [nRequests, Request] = useState(0);
  const [lastTimeOut, setLastTimeOut] = useState(0);
  const continueThen = () => {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      listener();
    }else{
      window.onscroll = listener
    }
  };
  const listener = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        Request(Math.random() + 1);
        window.onscroll = function () {}
        let timeout = setTimeout(continueThen, 12000);
        clearTimeout(lastTimeOut);
        setLastTimeOut(timeout);
        
    }
  }

  const action = async function(todo) {
    try {

      clearTimeout(lastTimeOut);
      const x = await fetch(`https://api.edamam.com/search?q=${match.params.recipe}&app_id=89f8c72a&app_key=fd1f83363351bb09ce23552830cdedef&from=${data.length}&to=${data.length+6}`);
      const y = await x.json();
      if(y.hits.length === 0) {
        setData(`sorry, couldn't find any recipe for '${match.params.recipe}'`);
      }else {
        todo(data, y);
        let timeout = setTimeout(continueThen, 12000);
        setLastTimeOut(timeout);
      }
      window.onscroll = function(){};
    }catch(e){
      console.error(e);
      setData("something went wrong, try again later :(");
    }
  }

  useEffect(() => {
    window.onscroll = listener;
  }, []);

  useEffect( () => {
    action((data, y) => setData([...data, ...y.hits]));
    console.log("nRequests");
  }, [nRequests]);

  useEffect(() => {
    if(data.length !== 0) {
      setData([]);
      action((data, y) => setData([...y.hits]));
      console.log("recipe");
    }
  }, [match.params.recipe]);

  if(data.length === 0) {
    return <div className="loader"/>;
  }

  if(typeof data === typeof "") {
  return <div style={centeredStyle}><h1>{data}</h1></div>
  }
  if(data.indexOf(undefined) !== -1) {
    setData("something went wrong, try again later :(");
  }
  return (
    <>
      <div className="container">
        <h1>Here is our Top Results:</h1>
        <div className="card-container">
          {data.map((val, i) => <Card recipe={val.recipe} key={i} i={i}/>)}
        </div>
      </div>
      <div style={{
        textAlign: "center",
        padding: "10px",
        position: "relative"
      }}><div className="loader" style={{
        width: "20px",
        height: "20px",
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #3498db"
      }}/></div>
    </>
  );
}


const PageNotFound = () => {
  return (
    <div style={centeredStyle}><h1>Page not Found. 404</h1></div>
  );
}

const Info = (props) => {
  window.onscroll = function() {}
  try{
    const recipe = props.history.location.recipe;
    return (
      <div className="container info">
        <h1>{recipe.label}</h1>
        <img  src={recipe.image} alt="img"/>
        <h2>Components:</h2>
        <ul>
          {recipe.ingredients.map((component, i) => 
          <li key={i}>
            {component.text} ({component.weight} gm)
          </li>)}
        </ul>
        <h2>health staff</h2>
        <ul>
          {recipe.healthLabels.map((label, i) => <li key={i}>{label}</li>)}
        </ul>
          <h4>source: {recipe.source}</h4>
      </div>
      );
  }catch(e) {
    console.error("this is because of the shit api i am using so i am not going to request the same data twice :), you can go back and choose the recipe again to see it :)");
    return <div></div>;
  }
}

const Main = () => {
  const history = useHistory();
  return (
    <>
      <NavBar search={(recipe) => {
        if(recipe.length === 0) {
          alert("type something to get your recipe.");
          
        }else {
          history.push(`/search/${recipe}`);
        }
        
        }}/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/examples" component={Popular}/>
          <Route exact path="/search/:recipe" component={Search}/>
          <Route exact path="/info" component={Info}/>
          <Route component={PageNotFound}/>
        </Switch>
    </>
  );
}

function App() {
  
  return (
    <div className="App">
        <Router>  
          <Main/>
        </Router>
    </div>
  );
}



export default App;
