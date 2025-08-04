import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer';
import planetas from "../assets/img/planets.jpeg";

const Planetas = () => {

    const [planets, setPlanets] = useState([])
    const { store, dispatch } = useGlobalReducer();


    const getPlanets = () => {
        fetch("https://www.swapi.tech/api/planets/?expanded=true", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((respuesta) => respuesta.json())
            .then((data) => {
                setPlanets(data.results)
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
        getPlanets();
    }, []);

    return (
        <>
            {planets.map((planet, index) => {
                const isFavorite = store.favoritos.some(fav => fav.name === planet.properties.name);
                return (
                    <div className="row">
                        <div key={index} className="mb-4 mx-4 my-4 p-4">
                            <div className="card h-100" style={{ width: "20rem", height: "10rem" }}>
                                <img src={planetas} className="card-img-top" alt="..." />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{planet.properties.name}</h5>
                                    <span className="card-text">
                                        Population: {planet.properties.population}
                                    </span>
                                    <span className="card-text">
                                        Terrain: {planet.properties.terrain}
                                    </span>
                                    <div className="mt-auto d-flex justify-content-between align-items-center">
                                        <Link to={`/planet/${planet.uid}`} className="btn btn-outline-primary">Leer más</Link>
                                        <button className={`btn ${isFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
                                            onClick={() => handleOnClick({
                                                name: planet.properties.name,
                                                uid: planet.uid,
                                                type: "planet"
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
    );
};

export default Planetas;