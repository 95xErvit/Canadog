import axios from "axios";

export async function authenticate(user : string, typeId: number, password : string ) 
{
    try 
    {
        const { data: { token } } = await axios.get(`${process.env.HOST_API}/Api/Gora/TokenGora`, {
            headers: {
                "x-api-key":<string>process.env.API_KEY
            }
        })
      
        try 
        {
    
            const result = await axios.post(`${process.env.HOST_API}/Api/Gora/CMS/Users/login`,
            {
                clientId: user, identificationTypeId:typeId, password: password
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(result.data)

            return { data: result.data, res:{ user:{  name:user, email:"" } } }
        }
        catch (err){
            console.log(err)
           return { data: null, res:{ user: { name:null, email:"" } } }
        }
    }
    catch (err) {
        console.log(err)
        return err
    }

}