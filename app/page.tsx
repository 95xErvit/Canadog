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

	const result : any = await GetPets(true, "Dog", "CANADOG");
	const result2  : any = await GetPets(true, "Cat", "CANADOG");
	const result3 : any = await GetPets(true, "History", "CANADOG")

	const cardsDogs : any = result.data.result.recordset.map( (animal : any) =>{ 
		return {
			id: animal.id,
			shortDescription: animal.shortDescription,
			longDescription: animal.longDescription,
			title: animal.title,
			old:animal.old,
			ANIMALS_TYPE:animal.ANIMALS_TYPE,
			ANIMALS_USER:animal.ANIMALS_USER,
			ANIMALS_DATE:animal.ANIMALS_DATE,
			ANIMALS_ENABLE:animal.ANIMALS_ENABLE,
			Image:[{image: animal.image},{image: animal.image2},{image: animal.image3}, {image: animal.image4}, {image:animal.image5}]
		}
	})

	const cardsCats : any = result2.data.result.recordset.map( (animal : any) =>{ 
		return {
			id: animal.id,
			shortDescription: animal.shortDescription,
			longDescription: animal.longDescription,
			title: animal.title,
			old:animal.old,
			ANIMALS_TYPE:animal.ANIMALS_TYPE,
			ANIMALS_USER:animal.ANIMALS_USER,
			ANIMALS_DATE:animal.ANIMALS_DATE,
			ANIMALS_ENABLE:animal.ANIMALS_ENABLE,
			Image:[{image: animal.image},{image: animal.image2},{image: animal.image3}, {image: animal.image4}, {image:animal.image5}]
		}
	})
	
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
