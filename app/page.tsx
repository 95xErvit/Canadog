import Home from "./Components/Home/Home";
import  Header  from './Components/Header/Header';
import  Footer  from './Components/Footer/Footer';
import { GetPets } from "./Components/Data/Data";
import { headers } from 'next/headers';

export default async function HomeCanadog() 
{
	const req = {
		headers: {
		  cookie: headers().get('cookie'),
		},
	};

	const cardsDogs : any = await GetPets(true, "Dog", "CANADOG");
	const cardsCats  : any = await GetPets(true, "Cat", "CANADOG");
	const result3 : any = await GetPets(true, "History", "CANADOG")
	
	for(let i= 0; i < cardsCats.length; i++)
	{
		let arr = cardsCats[i].Image
		arr = arr.filter((image : any) => image.image !== null && image.image !== undefined)
		cardsCats[i].Image = arr
	}

	for(let i= 0; i < cardsDogs.length; i++)
	{
		let arr = cardsDogs[i].Image
		arr = arr.filter((image : any) => image.image !== null && image.image !== undefined)
		cardsDogs[i].Image = arr
	}
	
	
	return (
		<>
			<Header/>
				<main className="bg-cover bg-center" style={{backgroundImage:'url("")'}}>
					<Home 
						cardsDogs={cardsDogs} /*{[]}*/
						cardsCats={cardsCats} /*{{[]}*/
						cardsHistory={result3.data.result.recordset} /*{[]}*/ 
					/>
				</main>
			<Footer/>
		</>
	)
}
