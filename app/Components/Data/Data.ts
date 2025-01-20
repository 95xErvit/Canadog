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

export async function GetProducts(enable? : boolean, type? : string, web? : string ) {

    try {

        const { data: { token } } = await axios.get(`${process.env.HOST_API}/Api/Gora/TokenGora`, {
            headers: {
                "x-api-key":<string>process.env.API_KEY
            }
        })

        try {

            const params = {Type: type, Enable:enable, Web: web}

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