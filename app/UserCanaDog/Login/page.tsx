import Login from "@/app/Components/Login";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'

export default async function PageLogin() 
{	

	const session = await getServerSession();

	console.log(session)
	if(session)
	{
		redirect('/UserCanaDog/CMS')
	}
	else
	{
		return (
			<>
				<main className="bg-cover bg-center" style={{backgroundImage:'url("")'}}>
					<Login />
				</main>
			</>
		)
	  }
	
}
