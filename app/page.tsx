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

	let cardsCats : any = []
	let cardsDogs : any = []

	console.log(result2.data.result.recordset)
	console.log(result2.data.result.recordset.length)
	if(result2.data.result.recordset.length <= 4)
	{
		cardsCats = [
			{
				id: 1,
				image: 'Miaus1.png',
				title: result2.data.result.recordset[0].ANIMALS_NAME,
				shortDescription: result2.data.result.recordset[0].ANIMALS_DESCRIPTION,
				longDescription: result2.data.result.recordset[0].ANIMALS_DESCRIPTION,
				old: result2.data.result.recordset[0].ANIMALS_OLDDATE
				
			},
			{
				id: 2,
				image: 'Miaus2.png',
				title: result2.data.result.recordset[1].ANIMALS_NAME,
				shortDescription: result2.data.result.recordset[1].ANIMALS_DESCRIPTION,
				longDescription: result2.data.result.recordset[1].ANIMALS_DESCRIPTION,
				old: result2.data.result.recordset[1].ANIMALS_OLDDATE
			},
			{
				id: 3,
				image: 'Miaus3.png',
				title: result2.data.result.recordset[2].ANIMALS_NAME,
				shortDescription: result2.data.result.recordset[2].ANIMALS_DESCRIPTION,
				longDescription: result2.data.result.recordset[2].ANIMALS_DESCRIPTION,
				old: result2.data.result.recordset[2].ANIMALS_OLDDATE
			},
			{
				id: 4,
				image: 'Miaus3.png',
				title: result2.data.result.recordset[3].ANIMALS_NAME,
				shortDescription: result2.data.result.recordset[3].ANIMALS_DESCRIPTION,
				longDescription: result2.data.result.recordset[3].ANIMALS_DESCRIPTION,
				old: result2.data.result.recordset[3].ANIMALS_OLDDATE
			}

		];
	}else if(result2.data.result.recordset.length === 5){
		cardsCats = [
			{
				id: 1,
				image: 'Miaus1.png',
				title: result2.data.result.recordset[0].ANIMALS_NAME,
				shortDescription: result2.data.result.recordset[0].ANIMALS_DESCRIPTION,
				longDescription: result2.data.result.recordset[0].ANIMALS_DESCRIPTION,
				old: result2.data.result.recordset[0].ANIMALS_OLDDATE
			},
			{
				id: 2,
				image: 'Miaus2.png',
				title: result2.data.result.recordset[1].ANIMALS_NAME,
				shortDescription: result2.data.result.recordset[1].ANIMALS_DESCRIPTION,
				longDescription: result2.data.result.recordset[1].ANIMALS_DESCRIPTION,
				old: result2.data.result.recordset[1].ANIMALS_OLDDATE
			},
			{
				id: 3,
				image: 'Miaus3.png',
				title: result2.data.result.recordset[2].ANIMALS_NAME,
				shortDescription: result2.data.result.recordset[2].ANIMALS_DESCRIPTION,
				longDescription: result2.data.result.recordset[2].ANIMALS_DESCRIPTION,
				old: result2.data.result.recordset[2].ANIMALS_OLDDATE
			},
			{
				id: 4,
				image: 'Miaus3.png',
				title: result2.data.result.recordset[3].ANIMALS_NAME,
				shortDescription: result2.data.result.recordset[3].ANIMALS_DESCRIPTION,
				longDescription: result2.data.result.recordset[3].ANIMALS_DESCRIPTION,
				old: result2.data.result.recordset[3].ANIMALS_OLDDATE
			},
			{
				id: 5,
				image: 'Miaus3.png',
				title: result2.data.result.recordset[4].ANIMALS_NAME,
				shortDescription: result2.data.result.recordset[4].ANIMALS_DESCRIPTION,
				longDescription: result2.data.result.recordset[4].ANIMALS_DESCRIPTION,
				old: result2.data.result.recordset[4].ANIMALS_OLDDATE
			}

		];
	}

	if(result.data.result.recordset.length <= 4)
	{
		cardsDogs = [
			{
				id: 1,
				image: 'Guau2.png',
				title: result.data.result.recordset[0].ANIMALS_NAME,
				shortDescription: result.data.result.recordset[0].ANIMALS_DESCRIPTION,
				longDescription: result.data.result.recordset[0].ANIMALS_DESCRIPTION,
				old: result.data.result.recordset[0].ANIMALS_OLDDATE
			},
			{
				id: 2,
				image: 'Guau1.png',
				title: result.data.result.recordset[1].ANIMALS_NAME,
				shortDescription: result.data.result.recordset[1].ANIMALS_DESCRIPTION,
				longDescription: result.data.result.recordset[1].ANIMALS_DESCRIPTION,
				old: result.data.result.recordset[1].ANIMALS_OLDDATE
			},
			{
				id: 3,
				image: 'Guau3.png',
				title: result.data.result.recordset[2].ANIMALS_NAME,
				shortDescription: result.data.result.recordset[2].ANIMALS_DESCRIPTION,
				longDescription: result.data.result.recordset[2].ANIMALS_DESCRIPTION,
				old: result.data.result.recordset[2].ANIMALS_OLDDATE
			},
			{
				id: 4,
				image: 'Guau1.png',
				title: result.data.result.recordset[3].ANIMALS_NAME,
				shortDescription: result.data.result.recordset[3].ANIMALS_DESCRIPTION,
				longDescription: result.data.result.recordset[3].ANIMALS_DESCRIPTION,
				old: result.data.result.recordset[3].ANIMALS_OLDDATE,
				
			}

		];
	}else if(result.data.result.recordset.length === 5){
		cardsDogs = [
			{
				id: 1,
				image: 'Guau2.png',
				title: result.data.result.recordset[0].ANIMALS_NAME,
				shortDescription: result.data.result.recordset[0].ANIMALS_DESCRIPTION,
				longDescription: result.data.result.recordset[0].ANIMALS_DESCRIPTION,
				old: result.data.result.recordset[0].ANIMALS_OLDDATE
			},
			{
				id: 2,
				image: 'Guau3.png',
				title: result.data.result.recordset[1].ANIMALS_NAME,
				shortDescription: result.data.result.recordset[1].ANIMALS_DESCRIPTION,
				longDescription: result.data.result.recordset[1].ANIMALS_DESCRIPTION,
				old: result.data.result.recordset[1].ANIMALS_OLDDATE
			},
			{
				id: 3,
				image: 'Guau.png',
				title: result.data.result.recordset[2].ANIMALS_NAME,
				shortDescription: result.data.result.recordset[2].ANIMALS_DESCRIPTION,
				longDescription: result.data.result.recordset[2].ANIMALS_DESCRIPTION,
				old: result.data.result.recordset[2].ANIMALS_OLDDATE
			},
			{
				id: 4,
				image: 'Guau4.png',
				title: result.data.result.recordset[3].ANIMALS_NAME,
				shortDescription: result.data.result.recordset[3].ANIMALS_DESCRIPTION,
				longDescription: result.data.result.recordset[3].ANIMALS_DESCRIPTION,
				old: result.data.result.recordset[3].ANIMALS_OLDDATE
			},
			{
				id: 5,
				image: 'Guau1.png',
				title: result.data.result.recordset[4].ANIMALS_NAME,
				shortDescription: result.data.result.recordset[4].ANIMALS_DESCRIPTION,
				longDescription: result.data.result.recordset[4].ANIMALS_DESCRIPTION,
				old: result.data.result.recordset[4].ANIMALS_OLDDATE
			}

		];
	}
	console.log(cardsDogs,cardsCats )

	return (
		<>
			<Header/>
				<main className="bg-cover bg-center" style={{backgroundImage:'url("")'}}>
					<Home 
						//Dogs={cardsDogs} /*{[]}*/
						//Cats={cardsCats} /*{[]}*/
					/>
				</main>
			<Footer/>
		</>
	)
}
