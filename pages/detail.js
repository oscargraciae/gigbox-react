import React from 'react';
import Link from 'next/link';

class Detail extends React.Component {

  render() {
    return (
      <div>
        <div className="container container-margin-top">
            <Link href="/signup"><a>hogar</a></Link>
        </div>
      </div>
    )
  }
}

export default Detail;
