import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import vehicles from "../assets/img/vehicles.jpeg";
import useGlobalReducer from '../hooks/useGlobalReducer';

const Vehiculos = () => {

    const [vehiculos, setVehiculos] = useState([])
    const { store, dispatch } = useGlobalReducer();

    const getVehiculos = () => {
        fetch("https://www.swapi.tech/api/vehicles/?expanded=true", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((respuesta) => respuesta.json())
            .then((data) => {
                setVehiculos(data.results)
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
        getVehiculos();
    }, []);

    return (
        <>
            {vehiculos.map((vehiculo, index) => {
                const isFavorite = store.favoritos.some(fav => fav.name === vehiculo.properties.name);
                return (
                    <div className="row">
                        <div key={index} className="mb-4 mx-4 my-4 p-4">
                            <div className="card h-100" style={{ width: "20rem", height: "auto" }}>
                                <img src={vehicles} className="card-img-top" alt="..." />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{vehiculo.properties.name}</h5>
                                    <span className="card-text">
                                        Modelo: {vehiculo.properties.model}
                                    </span>
                                    <span className="card-text">
                                        Capacidad de Carga: {vehiculo.properties.cargo_capacity}
                                    </span>
                                    <div className="mt-auto d-flex justify-content-between align-items-center">
                                        <Link to={`/vehiculo/${vehiculo.uid}`} className="btn btn-outline-primary">Leer más</Link>
                                        <button
                                            className={`btn ${isFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
                                            onClick={() => handleOnClick({
                                                name: vehiculo.properties.name,
                                                uid: vehiculo.uid,
                                                type: "vehiculo"
                                            })}
                                        >
                                            <i class={isFavorite ? 'fas fa-heart red' : 'far fa-heart'} style={{ color: "#c71414ff" }}></i>
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

export default Vehiculos;