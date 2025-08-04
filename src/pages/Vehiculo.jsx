import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import vehicles from "../assets/img/FM415.jpg";
import loadinggif from "../assets/img/animation-in-web-design.gif";

export const Vehiculo = () => {

    const [vehiculoDetails, setVehiculoDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { uid } = useParams();


    const getVehiculoDetails = () => {
        if (!uid) {
            setLoading(false);
            return;
        }
        fetch(`https://www.swapi.tech/api/vehicles/${uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error("No se pudo obtener la información del vehiculo.");
            }
            return respuesta.json();
        })
            .then((data) => {
                setVehiculoDetails(data.result.properties);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching vehiculo details:", error);
                setLoading(false);
                setVehiculoDetails(null);
            });
    }

    useEffect(() => {
        getVehiculoDetails();
    }, [uid]);

    if (loading) {
        return <div className="text-center mt-5">
            <img src={loadinggif} alt="" />
        </div>;
    }

    if (!vehiculoDetails) {
        return <div className="text-center mt-5">
            <span>No se encontraron los detalles del vehiculo.</span>
        </div>;
    }
    return (
        <>
            <div className="container mb-4 mt-4 text-white" >
                <div className="container d-flex justify-content-between align-items-center">
                    <img src={vehicles} className="img-fluid rounded-start w-50" alt="" />
                    <div className="align-items-center text-center text-white">
                        <h1>{vehiculoDetails.name}</h1>
                        <p className="text-white container">
                            Lorem ipsum dolor sit amet consectetur adipiscing elit aenean, dictumst bibendum congue malesuada ultricies conubia per vel egestas, leo urna non consequat interdum mollis velit. Leo tortor nulla porttitor metus eleifend turpis dis nullam ligula, ullamcorper pretium malesuada nascetur luctus sem vestibulum senectus, quam dictum tempor potenti facilisis posuere sociosqu aptent. Mauris commodo porta class interdum enim maecenas dictumst vivamus pharetra dictum, dui rutrum suspendisse primis fames sem nisi praesent eros, sapien netus accumsan facilisis scelerisque at quis platea porttitor. Dictumst per lectus fusce lobortis primis, massa fames rhoncus praesent litora, elementum ultricies diam cursus.
                        </p>
                    </div>
                </div>
                <hr style={{ backgroundColor: "#f50707ff", height: "3px", border: "none" }} />
                <div className="container">
                    <div className="row d-flex justify-content-space-evenly text-center">
                        <div className="col">
                            <p><strong>Name:</strong></p>
                            <p>{vehiculoDetails.name}</p>
                        </div>
                        <div className="col">
                            <p><strong>Model:</strong></p>
                            <p> {vehiculoDetails.model}</p>
                        </div>
                        <div className="col">
                            <p><strong>Capacity of Cargo:</strong></p>
                            <p> {vehiculoDetails.cargo_capacity}</p>
                        </div>
                        <div className="col">
                            <p><strong>Passengers:</strong></p>
                            <p> {vehiculoDetails.passengers}</p>
                        </div>
                        <div className="col">
                            <p><strong>Manufacturer:</strong></p>
                            <p> {vehiculoDetails.manufacturer}</p>
                        </div>
                        <div className="col">
                            <p><strong>Vehicle Class:</strong></p>
                            <p> {vehiculoDetails.vehicle_class}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};