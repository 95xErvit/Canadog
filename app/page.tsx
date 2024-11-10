import Home from "./Components/Home/Home";
import  Header  from './Components/Header/Header';
import  Footer  from './Components/Footer/Footer';
import { GetPets } from "./Components/Data/Data";
import { headers } from 'next/headers';

export default async function HomeGora() 
{
	const req = {
		headers: {
		  cookie: headers().get('cookie'),
		},
	};

	const result : any = await GetPets(true, "Dog");
	const result2  : any = await GetPets(true, "Cat");
	const result3 : any = await GetPets(true, "History")
	console.log(result.data.result.recordset.length)
	console.log(result2.data.result.recordset.length)
	console.log(result3.data.result.recordset.length)
	return (
		<>
			<Header/>
				<main className="bg-cover bg-center" style={{backgroundImage:'url("")'}}>
					<Home 
						cardsDogs={result.data.result.recordset} /*{[]}*/
						cardsCats={result2.data.result.recordset} /*{[]}*/
						cardsHistory={result3.data.result.recordset}
					/>
				</main>
			<Footer/>
		</>
	)
}
