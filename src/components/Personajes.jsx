import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer';
import personajes from "../assets/img/characters.jpeg";


const Personajes= () => {
    const [peoples, setPeoples] = useState([])
    const { store, dispatch } = useGlobalReducer();

    const getPeoples = () => {
        fetch("https://www.swapi.tech/api/people/?expanded=true", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((respuesta) => respuesta.json())
            .then((data) => {
                setPeoples(data.results)
            })
            .catch((error) => console.log(error));
    }

    const handleOnClick = (favoritosData) => {
        const isFavorite = store.favoritos.some(fav => fav.name === favoritosData.name);

        if (isFavorite) {
            dispatch({
                type: "removeFavoritoByName",
                payload: { name: favoritosData.name }
            });
        } else {
            dispatch({
                type: "addFavorito",
                payload: favoritosData
            });
        }
    };

    useEffect(() => {
        getPeoples();
    }, []);

    return (
        <>
            {peoples.map((people, index) => {
                const isFavorite = store.favoritos.some(fav => fav.name === people.properties.name);

                return (
                    <div className="row">
                        <div key={index} className="mb-4 mx-4 my-4 p-4">
                            <div className="card h-100" style={{ width: "20rem", height: "5rem" }}>
                                <img src={personajes} className="card-img-top" alt="..." />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{people.properties.name}</h5>
                                    <span className="card-text">
                                        Gender: {people.properties.gender}
                                    </span>
                                    <span className="card-text">
                                        Eye-Color: {people.properties.eye_color}
                                    </span>
                                    <span className="card-text">
                                        Hair Color: {people.properties.hair_color}
                                    </span>
                                    <div className="mt-auto d-flex justify-content-between align-items-center">
                                        <Link to={`/person/${people.uid}`} className="btn btn-outline-primary">Leer más</Link>
                                        <button
                                            className={`btn ${isFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
                                            onClick={() => handleOnClick({
                                                name: people.properties.name,
                                                uid: people.uid,
                                                type: "person"
                                            })}
                                        >
                                            <i class={isFavorite ? 'fas fa-heart' : 'far fa-heart'} style={{ color: "#c71414ff" }}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Personajes;