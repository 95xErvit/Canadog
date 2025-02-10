import CMS from "@/app/Components/CMS/CMS";
import Header from "@/app/Components/LoginStructure/Header";
import Footer from "@/app/Components/LoginStructure/Footer";
import { headers } from 'next/headers';
import { GetPets, GetProducts } from "@/app/Components/Data/Data";
export default async function Home() 
{
	const req = {
		headers: {
			cookie: headers().get('cookie'),
		},
	};

	const result : any = await GetPets(undefined,"Dog", "CANADOG");
	const result2  : any = await GetPets(undefined, "Cat", "CANADOG");
	const result3 : any = await GetPets(undefined, 'HISTORY', "CANADOG")
	const result4 : any = await GetProducts(undefined, "CANADOG")

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

	console.log(result4)
	return (
		<>
			<Header/>
				<main className="bg-cover bg-center" style={{backgroundImage:'url("")'}}>
					<CMS 
						cardsDogs={cardsDogs} /*{[]}*/
						cardsCats={cardsCats} /*{{[]}*/
						History={result3.data.result.recordset} 
						Products={result4.data.result.recordset}
					/>
				</main>
			<Footer/>
		</>
	)
}