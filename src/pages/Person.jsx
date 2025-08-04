import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import personajes from "../assets/img/personajes.webp";
import loadinggif from "../assets/img/animation-in-web-design.gif";

export const Person = () => {

    const [personDetails, setPersonDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { uid } = useParams();
   


    const getPersonDetails = () => {
        if (!uid) {
            setLoading(false);
            return;
        }
        fetch(`https://www.swapi.tech/api/people/${uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error("No se pudo obtener la información del personaje.");
            }
            return respuesta.json();
        })
            .then((data) => {
                setPersonDetails(data.result.properties);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching people details:", error);
                setLoading(false);
                setPersonDetails(null);
            });
    }

    useEffect(() => {
        getPersonDetails();
    }, [uid]);

    if (loading) {
        return <div className="text-center mt-5">
            <img src={loadinggif} alt="" />
        </div>;
    }

    if (!personDetails) {
        return <div className="text-center mt-5">
            <span>No se encontraron los detalles del personaje.</span>
        </div>;
    }
    return (
        <div className="container mb-4 mt-4 text-white" >
            <div className="container d-flex justify-content-between align-items-center">
                <img src={personajes} className="img-fluid rounded-start w-50" alt="" />
                <div className="align-items-center text-center text-white">
                    <h1>{personDetails.name}</h1>
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
                        <p>{personDetails.name}</p>
                    </div>
                    <div className="col">
                        <p><strong>Birth Year:</strong></p>  
                        <p> {personDetails.birth_year}</p>
                    </div>
                    <div className="col">
                        <p><strong>Gender:</strong></p>  
                        <p> {personDetails.gender}</p>
                    </div>
                     <div className="col">
                        <p><strong>Height:</strong></p>  
                        <p> {personDetails.height}</p>
                    </div>
                     <div className="col">
                        <p><strong>Skin Color:</strong></p>  
                        <p> {personDetails.skin_color}</p>
                    </div>
                     <div className="col">
                        <p><strong>Eye Color:</strong></p>  
                        <p> {personDetails.eye_color}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

