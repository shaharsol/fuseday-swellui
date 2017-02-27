import React, {Component} from 'react';
import moment from 'moment';

export default (props)=><div>
    {props.pics.map(pic=><div key={pic.url} className="pic-wrap"><img src={pic.url}/><div>{moment(pic.date_taken).format('MMMM Do YYYY, h:mm:ss a')}</div></div>)}
</div>