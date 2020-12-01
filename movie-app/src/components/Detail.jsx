import React, { useState, useEffect } from 'react';
import { useParams , useHistory } from 'react-router-dom';
import axios from 'axios';
import { Container  , Navbar} from 'react-bootstrap';
import rotten from '../assets/rotten.png';
import meta from '../assets/meta.png';
import Toast from '../helpers'

const Detail = () => {
    const history = useHistory();
    const id = useParams().id;
    const [movie,setMovie] = useState(null);

    useEffect(() => {
        axios(` http://www.omdbapi.com/?i=${id}&plot=full&apikey=faf7e5bb`)
        .then(({data}) => {
            setMovie(data)
        })
        .catch(err => {
            Toast.fire({
                icon: 'error',
                title: `${err.message}`
              })
        })
    },[])

    const handleHome = () => {
        history.push('/')
    }

    return (
        <Container fluid className="d-flex justify-content-center pb-4 text-light background-container">
            {movie &&
            <Container>
                <Navbar>
                    <Navbar.Brand role="button" className="text-success" onClick={handleHome}>Home</Navbar.Brand>
                </Navbar>
                <Container className="row whole-detail">
                    <Container className="col-4 pt-2 d-flex flex-column">
                        <h6 className="text-center id-year"> {movie.imdbID} </h6>                   
                        <img src={(movie.Poster === 'N/A') ?  'https://i2.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1' : movie.Poster } className="card-image" alt="..." />
                        {movie.Awards === 'N/A' ? <></> : <span id="award"> <i class="fas fa-trophy mr-2"></i> {movie.Awards} </span> }  
                        <Container className="d-flex flex-column">
                            <h3 className="text-center id-year">Reviews</h3>
                            {movie.Ratings.length > 0 ? <Container className="d-flex flex-row justify-content-between pl-0">
                                <Container className="d-flex flex-row mx-0 pr-0" id="reviews-container">
                                <i class="fab fa-imdb pr-2" id="imdb"></i>
                                 {movie.Ratings[0] ? <span>{movie.Ratings[0].Value}</span> : <></>} 
                                </Container>
                                {movie.Ratings[1] ? <span> <img className="logo" src={rotten} alt=""/> {movie.Ratings[1].Value} </span> : <></> }                               
                                {movie.Ratings[2] ? <span><img className="logo" src={meta} alt=""/> {movie.Ratings[2].Value} </span> : <></> }                               
                                                                
                            </Container> : 
                            <Container> <h5>This movie has no reviews yet</h5> </Container> }
                            
                        </Container>
                    </Container>
                    <Container className="col-8 d-flex flex-column pl-0 mt-1">
                        <Container className="d-flex flex-row justify-content-between mt-1 pl-0" id="heading-container"  >
                            <Container className="d-flex flex-column pl-0">
                                <span> <h5 className="id-year"> {movie.Year} </h5>  </span>
                                <span id="title-rated"><h2 > {movie.Title}</h2> <span id="rated"><i class="fas fa-registered"> {movie.Rated}</i></span>  </span>
                                <span><i class="fas fa-stopwatch"></i> {movie.Runtime}</span>
                                <span><i class="far fa-calendar-alt"></i> {movie.Released} </span>
                                <Container className="d-flex flex-row pl-0">
                                    <span className="bg-warning px-3 py-1 mr-3 text-dark"> <b>{movie.imdbRating}</b> </span>    
                                    <span className="mt-1 id-year"> {movie.imdbVotes} votes </span>    
                                </Container>                         
                                </Container>                        
                        </Container>
                        <Container className="d-flex flex-column ml-3 mt-4">                        
                            <span> Directors : {movie.Director === 'N/A' ? 'unknown' : movie.Director} </span>
                            <span> Genre : {movie.Genre} </span>
                            <span> Casts : {movie.Actors} </span>
                            <span> Language : {movie.Language} </span>
                            <span> Country : {movie.Country} </span>
                            <span> House Productions : {movie.Production} </span>
                        </Container>
                            <Container className="mt-3 ml-3">
                                <h6 className="id-year">Writers</h6>
                                <p>{movie.Writer === 'N/A' ? 'unknown' : movie.Writer}</p>
                            </Container>
                            <Container className="ml-3">
                                <h6 className="id-year"> Synopsis </h6>
                                <p id="plot"> {movie.Plot} </p>   
                            </Container>
                            <Container className="ml-3 d-flex flex-column">
                                {
                                    (movie.DVD !== 'N/A' || movie.BoxOffice !== 'N/A' || movie.Website !== 'N/A') &&
                                    <Container className="pl-0">
                                        <h6 className="id-year">Available Resources</h6>
                                        {movie.DVD ? <span>DVD : {movie.DVD === 'N/A' ? 'unavailable at this moment' : movie.DVD} </span> : <></> }
                                        {movie.BoxOffice ? <span>BoxOffice : {movie.BoxOffice === 'N/A' ? 'unavailable at this moment' : movie.BoxOffice} </span> : <></> }
                                        {movie.Website ? <span>Website : {movie.Website === 'N/A' ? 'unavailable at this moment' : movie.Website} </span> : <></> }
                                    </Container>
                                }                              
                            </Container>                                        
                    </Container>
                </Container>
            </Container>
            
            }
        </Container>
    )
}

export default Detail;