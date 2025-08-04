import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import planetas from "../assets/img/planeta-oscuro.avif";
import loadinggif from "../assets/img/animation-in-web-design.gif";

export const Planet = () => {

    const [planetDetails, setPlanetDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { uid } = useParams();


    const getPlanetDetail = () => {
        if (!uid) {
            setLoading(false);
            return;
        }
        fetch(`https://www.swapi.tech/api/planets/${uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error("No se pudo obtener la información del planeta.");
            }
            return respuesta.json();
        })
            .then((data) => {
                setPlanetDetails(data.result.properties);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching planet details:", error);
                setLoading(false);
                setPlanetDetails(null);
            });
    }

    useEffect(() => {
        getPlanetDetail();
    }, [uid]);

    if (loading) {
        return <div className="text-center mt-5 text-light">
            <img src={loadinggif} alt="" />
        </div>;
    }

    if (!planetDetails) {
        return <div className="text-center mt-5 ">
            <span>No se encontraron los detalles del planeta.</span>
        </div>;
    }
    return (
        <>
            <div className="container mb-4 mt-4 text-white" >
                <div className="container d-flex justify-content-between align-items-center">
                    <img src={planetas} className="img-fluid rounded-start w-50" alt="" />
                    <div className="align-items-center text-center text-white">
                        <h1>{planetDetails.name}</h1>
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
                            <p>{planetDetails.name}</p>
                        </div>
                        <div className="col">
                            <p><strong>Climate:</strong></p>
                            <p> {planetDetails.climate}</p>
                        </div>
                        <div className="col">
                            <p><strong>Population:</strong></p>
                            <p> {planetDetails.population}</p>
                        </div>
                        <div className="col">
                            <p><strong>Orbital Period:</strong></p>
                            <p> {planetDetails.orbital_period}</p>
                        </div>
                        <div className="col">
                            <p><strong>Rotation Period:</strong></p>
                            <p> {planetDetails.rotation_period}</p>
                        </div>
                        <div className="col">
                            <p><strong>Diameter:</strong></p>
                            <p> {planetDetails.diameter}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};