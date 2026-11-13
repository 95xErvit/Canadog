import Hero from "./Components/Home/Components/Hero";
import CardsAnimals from "./Components/Home/Components/CardsAnimals";
import  Header  from './Components/Header/Header';
import  Footer  from './Components/Footer/Footer';
import Historys from "./Components/Home/Components/Historys";
import StepsImages from "./Components/Home/Components/StepsImages";
import DonationSection from "./Components/Home/Components/DonationSection";
import Appreciates from "./Components/Home/Components/Appreciates";
import { GetPets } from "./Components/Data/Data";
import { headers } from 'next/headers';
// import  Banner from "./Banner"
// import  AdBanner from "."
// import  AdBannerP from "./BannerPequeño"
import BannerADS from "../public/BannerAdds.png";
import Image from 'next/image';

export default async function HomeCanadog() 
{
	const req = {
		headers: {
		  cookie: headers().get('cookie'),
		},
	};

	const [array, array2, result3] : any[] = await Promise.all([
		GetPets(true, "DOG", "CANADOG", false),
		GetPets(true, "CAT", "CANADOG", false),
		GetPets(true, "History", "CANADOG"),
	])
	let cardsDogs = array.array
	let cardsCats = array2.array
	console.log("cats", cardsCats)
	
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
				<main className="pt-20 bg-cover bg-center" style={{backgroundImage:'url("")'}}>
					<Hero />

					<CardsAnimals 
						CardsDogs={cardsDogs} /*{[]}*/
						CardsCats={cardsCats} /*{{[]}*/
					/>

					<DonationSection />

					<Appreciates />

					<Historys CardsHistory={result3.array} />

					{/* PUBLICIDAD */}
					<div className='flex justify-center mt-6 mb-6 py-6'>
						<Image src={BannerADS} alt="Publicidad" className="w-full h-full object-cover" />
					{ 
						// window.innerWidth >= 728 ?
						// <Banner/>
						// :  
						// window.innerWidth >= 468 ?
						// <AdBanner/>
						// :
						// <AdBannerP/>
					}
					{/*<script async={true} data-cfasync="false" src="//pl26062928.effectiveratecpm.com/fe98476a7a70879b195eafa963b474de/invoke.js"></script>
					<div id="container-fe98476a7a70879b195eafa963b474de"></div>*/}
					</div>

					<StepsImages />
				</main>
			<Footer/>
		</>
	)
}
/*
DogsLength={array.petsLength}
						CardsHistory={result3.array} 
*/