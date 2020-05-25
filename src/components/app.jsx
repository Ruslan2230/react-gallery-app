import React from "react";
import { Item } from "./Item";
import "../styles.css";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      loading: false,
      toggleAutoRefresh: false,
      valueRange: 0
    };
  }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    this.setState({
        loading: true
      });
  
      const url = "https://www.reddit.com/r/reactjs.json?limit=100";
      fetch(url)
        .then(response => response.json())
        .then(({ data }) => {
          this.setState({
            items: data.children,
            loading: false
          });
        });
  }

  autoUpdate = () => {
      if (this.state.toggleAutoRefresh) {
        this.setState({ toggleAutoRefresh: false });
        clearInterval(this.autoRefresh);
      } else {
          this.setState({ toggleAutoRefresh: true });
        this.autoRefresh = setInterval(this.getItems, 3000);
      }
  }

  updateRange = (e) => {
    this.setState({
        valueRange: +e.target.value
      });
  }

  getComents = (items, valueRange) => 
  items
      .filter( item => item.data.num_comments >= valueRange )
      .sort((a,b) => b.data.num_comments - a.data.num_comments);
  

  render() {
    const { items, loading, toggleAutoRefresh, valueRange } = this.state;
    const sortByComents = this.getComents(items, valueRange);
    console.log (this.state);
    return (
      <div className="container">
        <h1 className="top">Top commented</h1>
        <div>
            <h2 className="currentValue">Current filter: {valueRange}</h2>
            <button className="btn" type="button" onClick={this.autoUpdate} >
                {toggleAutoRefresh ? "Stop" : "Start"} auto-refresh
            </button>
        </div>

        <input 
        className="range" 
        type="range" 
        value={valueRange} 
        onChange={this.updateRange} 
        min={0} 
        max={500} 
        step={5} 
        />
       <div className="gallery-grid">
        {loading ? (
          <div className="loading">...Loading</div>
        ) : (
            sortByComents.length > 0 ? sortByComents.map(item => <Item key={item.data.id} data={item.data} 
            />)
            : <p className="no">No results found matching your criteria</p>
        )}
        </div>
      </div>
    );
  }
}
