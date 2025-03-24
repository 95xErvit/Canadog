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

	//const cardsDogs : any = await GetPets(undefined,"Dog", "CANADOG");
	const cardsCats  : any = await GetPets(undefined, "Cat", "CANADOG");
	//const result3 : any = await GetPets(undefined, 'HISTORY', "CANADOG")
	const result4 : any = await GetProducts(undefined, "CANADOG")
	
	for(let i= 0; i < cardsCats.length; i++)
	{
		let arr = cardsCats[i].Image
		arr = arr.filter((image : any) => image.image !== null && image.image !== undefined)
		cardsCats[i].Image = arr
	}

	/*for(let i= 0; i < cardsDogs.length; i++)
	{
		let arr = cardsDogs[i].Image
		arr = arr.filter((image : any) => image.image !== null && image.image !== undefined)
		cardsDogs[i].Image = arr
	}*/

	return (
		<>
			<Header/>
				<main className="bg-cover bg-center" style={{backgroundImage:'url("")'}}>
					<CMS 
						/* Dogs={cardsDogs} /*{[]}*/
						Cats={cardsCats} /*{{[]}*/
						/*History={result3.data.result.recordset} */
						Products={result4.data.result.recordset}
					/>
				</main>
			<Footer/>
		</>
	)
}