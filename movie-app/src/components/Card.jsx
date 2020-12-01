import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Card = ({props}) => {
    const history = useHistory();

    const handleDetail = () => {
        history.push(`/${props.imdbID}`)
    }

    return (
        <Container className="mx-3 mb-5 card-container" role="button" onClick={handleDetail} >  
            <img src={(props.Poster === 'N/A') ?  'https://i2.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1' : props.Poster } className="pr-1 card-image" alt="..." />
            <Container className="d-flex flex-row justify-content-between pl-0 pr-0">
                <span> <b>{props.Title}</b> </span>            
                <span style={{color:'#fffaa4'}}> <b>{props.Type}({props.Year})</b> </span>            
            </Container>
        </Container>
    )

}

export default Card;