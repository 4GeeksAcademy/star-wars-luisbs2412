import Personajes from "../components/Personajes.jsx";
import Planetas from "../components/Planetas.jsx";
import Vehiculos from "../components/Vehiculos.jsx";




export const Home = () => {

	
	return (
		<>
			<div className="container mb-4 mt-4">
				{/* <div className="text-left mt-5"> */}
					<h1 className="text-danger mb-4 mt-4">Personajes</h1>
					
					<div className="d-flex flex-nowrap overflow-x-auto py-2">
						<li className="list-group list-group-horizontal">
							<Personajes />
						</li>
					</div>

					<h1 className="text-danger mb-4 mt-4">Planetas</h1>

					<div className="d-flex flex-nowrap overflow-x-auto py-2">

						<li className="list-group list-group-horizontal">
							<Planetas />
						</li>

					</div>

					<h1 className="text-danger mb-4 mt-4">Vehiculos</h1>

					<div className="d-flex flex-nowrap overflow-x-auto py-2">

						<li className="list-group list-group-horizontal">
							<Vehiculos />
						</li>

					</div>
				{/* </div> */}
			</div>
		</>
	);
}; 