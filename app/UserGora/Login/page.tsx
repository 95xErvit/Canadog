import Login from "@/app/Components/Login";
import Header from "@/app/Components/LoginStructure/Header";
import Footer from "@/app/Components/LoginStructure/Footer";
import { headers } from 'next/headers';

export default async function PageLogin() 
{
	const req = {
		headers: {
			cookie: headers().get('cookie'),
		},
	};
		return (
			<>
				<Header/>
					<main className="bg-cover bg-center" style={{backgroundImage:'url("")'}}>
						<Login />
					</main>
				<Footer/>
			</>
		)
}
