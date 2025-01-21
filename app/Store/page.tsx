import Store from "@/app/Components/Store/Store";
import  Header  from '@/app/Components/Header/Header';
import  Footer  from '@/app/Components/Footer/Footer';
import { headers } from 'next/headers';
import { GetProducts } from "@/app/Components/Data/Data";
export default async function Home() 
{
	const req = {
		headers: {
			cookie: headers().get('cookie'),
		},
	};

	const result : any = await GetProducts(true,"PRODUCTOS", "CANADOG");
	
	return (
		<>
			<Header/>
				<main className="bg-cover bg-center" style={{backgroundImage:'url("")'}}>
					<Store 
						CardsProducts={result.data === undefined ? [{id:1, title:"camara", cost:"1.000.000", unity:"2", image: "https://heroui.com/images/card-example-6.jpeg"}] : result.data.result.recordset}
					/>
				</main>
			<Footer/>
		</>
	)
}