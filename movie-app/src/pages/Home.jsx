import React, { useState , useEffect } from 'react';
import { Container , Form , Navbar, FormControl , Nav , Button} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Card from '../components/Card';
import { useHistory } from 'react-router-dom';
import moviesData from '../movies.json';
import Toast from '../helpers'

const Home = () => {
    const history = useHistory();
    const [title,setTitle] = useState('');
    const [totalPage,setTotalPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [normal,setNormal] = useState(false);

    useEffect(() => {
        Toast.fire({
            icon: 'success',
            title: 'Rendering default page'
        })
        setMovies(moviesData.movies);
        setNormal(false);
    },[])

    const handleSearch = (e) => {
        let num = e.selected;
        num++
        if(!num) {
            num = 1
        }
        axios(`https://www.omdbapi.com/?apikey=faf7e5bb&s=${title}&page=${num}`)
        .then(({data}) => {
            if(data.Error) {
                Toast.fire({
                    icon: 'success',
                    title: 'rendering default movies , error while searching'
                  })
                setMovies(moviesData.movies);

                setNormal(false)
            } else {
                setNormal(true);
                setMovies(data.Search);
                setTotalPage((Math.round(data.totalResults/10)));
            }
        })
        .catch(err => {
            Toast.fire({
                icon: 'error',
                title: `${err.message}`
              })
        })
    }

    const handleHome = () => {
        history.push('/')
    }

    return (
        <Container fluid className="px-0">
            <Navbar className="bg-dark pb-3">
            <Navbar.Brand className="text-success pl-3" role="button" onClick={handleHome}>Indoflix Cinema</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search Your Movie" className="mr-sm-2" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <Button variant="outline-success" onClick={handleSearch} >Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            {
                !normal && 
                <Container fluid className="d-flex flex-column justify-content-center background-container text-light">
                    <Container fluid className="d-flex justify-content-center mt-4 flex-wrap">
                        {
                            movies.map((el,i) => {
                                return (
                                    <Card
                                    key={i}
                                    props={el}
                                    normal={normal}
                                    />
                                )
                            })
                        }
                    </Container>
                </Container>          
            }
            {
                 normal && movies.length > 0 && 
                <Container className="background-container text-light" fluid>
                    <Container className="d-flex justify-content-center">
                        <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={totalPage}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        onPageChange={(e) => handleSearch(e)}
                        activeClassName={"active"}/>
                    </Container>
                    <Container fluid className="d-flex justify-content-center mt-4 flex-wrap">
                        {
                            movies.map((el,i) => {
                                return (
                                    <Card
                                    key={i}
                                    props={el}
                                    normal={normal}
                                    />
                                )
                            })
                        }
                    </Container>
                </Container>       
            }
        </Container>
    )
}

export default Home;