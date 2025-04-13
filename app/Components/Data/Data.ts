import axios from "axios";

export async function GetPets(enable? : boolean, type? : string, web? : string ) {

    try {

        const { data: { token } } = await axios.get(`${process.env.HOST_API}/Api/Gora/TokenGora`, {
            headers: {
                "x-api-key":<string>process.env.API_KEY
            }
        })

        try {

            const params = {Type: type, Enable:enable, Web: web}

            const result = await axios.get(`${process.env.HOST_API}/Api/Gora/CMS/Pets`,
            {   
                params: params,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if(type === "Dog" || type === "Cat")
            {   

                let fin = result.data.result.recordset.length >= 5 ? 5 :  result.data.result.recordset.length
                let array = []
                for(let i = 0; i < fin;  i++){
                    let animal : any = {
                        id: result.data.result.recordset[i].id,
                        shortDescription: result.data.result.recordset[i].shortDescription,
                        longDescription: result.data.result.recordset[i].longDescription,
                        title: result.data.result.recordset[i].title,
                        old:result.data.result.recordset[i].old,
                        ANIMALS_TYPE:result.data.result.recordset[i].ANIMALS_TYPE,
                        ANIMALS_USER:result.data.result.recordset[i].ANIMALS_USER,
                        ANIMALS_DATE:result.data.result.recordset[i].ANIMALS_DATE,
                        ANIMALS_ENABLE:result.data.result.recordset[i].ANIMALS_ENABLE,
                        Image:[{image: result.data.result.recordset[i].image},
                            {image: result.data.result.recordset[i].image2},
                            {image: result.data.result.recordset[i].image3}, 
                            {image: result.data.result.recordset[i].image4}, 
                            {image:result.data.result.recordset[i].image5}]
                    }
                    array.push(animal)
                }
                return array
            }
            else
            {
                return result
            }
        }
        catch (err) {
            console.log(err)
            return err
        }
    }
    catch (err) {
        console.log(err)
        return err
    }

}

export async function GetProducts(enable? : boolean, web? : string ) {

    try {

        const { data: { token } } = await axios.get(`${process.env.HOST_API}/Api/Gora/TokenGora`, {
            headers: {
                "x-api-key":<string>process.env.API_KEY
            }
        })

        try {

            const params = {PRODUCTS_ENABLE:enable, PRODUCTS_WEB: web}

            const result = await axios.get(`${process.env.HOST_API}/Api/Gora/CMS/Products`,
            {   
                params: params,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return result
        }
        catch (err) {
            console.log(err)
            return err
        }
    }
    catch (err) {
        console.log(err)
        return err
    }

}