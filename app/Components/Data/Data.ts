import axios from "axios";

export async function GetPets(enable? : boolean, type? : string, web? : string, call? : boolean ) {

    try {  
        console.log(type)

        const { data: { token } } = await axios.get(`${call ? 'https://api.innminds.com.co:443' : process.env.HOST_API }/Api/Gora/TokenGora`, {
            headers: {
                "x-api-key": <string>process.env.API_KEY
            }
        })

        try {

            const params = {Type: type, Enable:enable}

            const result = await axios.get(`${call ? 'https://api.innminds.com.co:443' : process.env.HOST_API}/Api/Gora/CMS/Pets`,
            {   
                params: params,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(result.data)
            if(type === "DOG" || type === "CAT")
            {   

                let fin = (call === false) ? result.data.result.recordset.length > 3 ? 4 : result.data.result.recordset.length : result.data.result.recordset.length
                let array = []
                console.log(fin)
                for(let i = 0; i < fin;  i++){
                    let animal : any = {
                        id: result.data.result.recordset[i].ANIMALS_ID,
                        shortDescription: result.data.result.recordset[i].ANIMALS_DESCRIPTION,
                        longDescription: result.data.result.recordset[i].ANIMALS_DESCRIPTION,
                        title: result.data.result.recordset[i].ANIMALS_NAME,
                        old:result.data.result.recordset[i].ANIMALS_OLDDATE,
                        ANIMALS_TYPE:result.data.result.recordset[i].ANIMALS_TYPE,
                        ANIMALS_USER:result.data.result.recordset[i].ANIMALS_USER,
                        ANIMALS_DATE:result.data.result.recordset[i].ANIMALS_DATE,
                        ANIMALS_ENABLE:result.data.result.recordset[i].ANIMALS_ENABLE,
                        Image:[{image: result.data.result.recordset[i].ANIMALS_IMAGE_1},
                            {image: result.data.result.recordset[i].ANIMALS_IMAGE_2}]
                    }
                    array.push(animal)
                }
                return{ array, petsLength: result.data.result.recordset.length }
            }
            else
            {
                return { array : result.data.result.recordset , petsLength: result.data.result.recordset.length }
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

export async function GetProducts(enable? : boolean, web? : string, call? : boolean ) {

    try {

        const { data: { token } } = await axios.get(`${call ? 'https://api.innminds.com.co:443' : process.env.HOST_API}/Api/Gora/TokenGora`, {
            headers: {
                "x-api-key": call ? 'c55af7ae-f776-4bea-91cf-b05467981d64' :<string>process.env.API_KEY
            }
        })

        try {

            const params = {PRODUCTS_ENABLE:enable, PRODUCTS_WEB: web}

            const result = await axios.get(`${call ? 'https://api.innminds.com.co:443' : process.env.HOST_API}/Api/Gora/CMS/Products`,
            {   
                params: params,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            //console.log(result.data.result.recordset)
           let fin = (call === false) ? result.data.result.recordset.length > 3 ? 4 : result.data.result.recordset.length : result.data.result.recordset.length
            let array = []
            for(let i = 0; i < fin;  i++)
            {
                array.push(result.data.result.recordset[i])
            }
            return array
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