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
                return result.data.result.recordset.map( (animal : any) =>{ 
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