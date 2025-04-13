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

                let fin = result.data.result.recordset.Length >= 3 ? 3 :  result.data.result.recordset.Length
                let array = []
                for(let i = 0; i < fin;  i++){
                    let animal : any = {
                        id: result.data.result.recordset[0].id,
                        shortDescription: result.data.result.recordset[0].shortDescription,
                        longDescription: result.data.result.recordset[0].longDescription,
                        title: result.data.result.recordset[0].title,
                        old:result.data.result.recordset[0].old,
                        ANIMALS_TYPE:result.data.result.recordset[0].ANIMALS_TYPE,
                        ANIMALS_USER:result.data.result.recordset[0].ANIMALS_USER,
                        ANIMALS_DATE:result.data.result.recordset[0].ANIMALS_DATE,
                        ANIMALS_ENABLE:result.data.result.recordset[0].ANIMALS_ENABLE,
                        Image:[{image: result.data.result.recordset[0].image},
                            {image: result.data.result.recordset[0].image2},
                            {image: result.data.result.recordset[0].image3}, 
                            {image: result.data.result.recordset[0].image4}, 
                            {image:result.data.result.recordset[0].image5}]
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