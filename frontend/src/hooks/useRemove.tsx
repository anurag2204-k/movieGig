import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const useRemove=()=>{
    const [loading_remove, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const removeItem = async(itemId:string)=>{
        setLoading(true)
        try{
            const res = await axios.put("http://localhost:3000/api/watchlist/remove",{
                id:itemId
            }, {
                withCredentials:true
            });

            if(res.status===200)
            {
                console.log(res.data)
            }

        }catch(error){
            console.error(error)
            toast.error("Failed to remove movie from watchlist")
        }finally{
            setLoading(false)
        }
    }
    return {loading_remove}
}

export default useRemove