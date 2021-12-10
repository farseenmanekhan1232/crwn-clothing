import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items , history}) => {
  let noOfItems = 0;
  return(
  <div className='collection-preview'>
    <div className='header'>
      <Link to={`${history.location.pathname}/${title.toLowerCase()}`} className='title'>{title.toUpperCase()}</Link>
      <Link to={`${history.location.pathname}/${title.toLowerCase()}`}  className='more'>view more</Link>
    </div>
    <div className='preview'>
      {items.map(item => {
        if(noOfItems>3){
          return [];
        }
        noOfItems++;
        return <CollectionItem key={item.id} item={item} />
      }
        )}
    </div>
  </div>
)};

export default withRouter(CollectionPreview);
