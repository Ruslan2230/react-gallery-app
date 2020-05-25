import React, { PureComponent } from "react";
import "../styles.css";

export class Item extends PureComponent {
  render() {
    const { data } = this.props;
    
    return (
    <div className="box">
      {data.thumbnail && <img 
      className="img" 
      src={data.thumbnail} 
      alt="" />
      }
      <p>{data.title}</p>
      <p>{data.num_comments}</p>
      <a className="link"
        href={`https://www.reddit.com/${data.permalink}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Link
      </a>
    </div>
    );
  }
}
