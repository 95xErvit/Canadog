import Login from "@/app/Components/Login";
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
				<main className="bg-cover bg-center" style={{backgroundImage:'url("")'}}>
					<Login />
				</main>
			</>
		)
}
