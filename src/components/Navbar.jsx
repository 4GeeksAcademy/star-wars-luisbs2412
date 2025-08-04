import { Link } from "react-router-dom";
import logo from "../assets/img/Star-Wars.png"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	

	const handleOnDelete = (index) => {
	    dispatch({
	        type: "removeFavorito",
	        payload: { index }
	    });
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<img src={logo} alt="star_wars_logo" style={{ width: "100px", height: "65px" }} />
				</Link>
				<div className="ml-auto btn-group-vertical">
						<button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="false" style={{ alignContent: "left" }}>
							Favoritos 
							<button className="btn btn-secondary" style={{ marginLeft: "10px" }}>
								{store.favoritos.length}	
							</button> 
						</button>
						<ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" style={{ textAlign: "left" }}>
							{store.favoritos.length > 0 ? (
							 store.favoritos.map((favorito, index) => ( 
									<li  key={index} className="d-flex justify-content-around align-items-center">
										<Link to={`/${favorito.type}/${favorito.uid}`} className="dropdown-item">
											<div>
												<span>{favorito.name}</span>
											</div>
										</Link>
										<button className="btn btn-dark"><i class="fa-solid fa-trash-can" onClick={()=>{handleOnDelete(index)}} style={{ color: "#FFFFFF" }}></i></button>
									</li>
								))
							) : (
								<li>
									<span className="dropdown-item text-light">Lista vacia</span>
								</li>
							)}
						</ul>
				</div>
			</div>
		</nav>
	);
};