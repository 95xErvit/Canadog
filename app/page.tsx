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

	let array : any = await GetPets(true,"Dog", "CANADOG", false);
	let cardsDogs = array.array
	let array2 : any = await GetPets(true, "Cat", "CANADOG", false);
	let cardsCats  = array2.array
	//const result3 : any = await GetPets(true, "History", "CANADOG")
	//console.log(cardsCats)
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
						CardsDogs={cardsDogs} /*{[]}*/
						CardsCats={cardsCats} /*{{[]}*/
						DogsLength={array.petsLength}
						/*cardsHistory={result3.data.result.recordset} /*{[]}*/ 
					/>
				</main>
			<Footer/>
		</>
	)
}
