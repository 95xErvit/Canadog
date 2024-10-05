import Donations from "@/app/Components/Donations/Donations";
import Header from "@/app/Components/Header/Header";
import Footer from "@/app/Components/Footer/Footer";

export default async function HomeGora() {

    return (
        <>
            <Header/>
                <main className="bg-cover bg-center" style={{backgroundImage:'url("")'}}>
                    <Donations 
                        //Dogs={result.data.result} /*{[]}*/
                        // Cats={result2.data.result} {[]}
                    />
                </main>
            <Footer/>
        </>
    )
}
