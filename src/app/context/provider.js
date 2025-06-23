"use client"
import { useEffect, useState } from "react"

import { currentuser } from "../services/Add_user"
import { UserContext } from "./usecontext"


export const Useprovider = ({ children }) => {

    const [user, setuser] = useState(undefined)
    useEffect(() => {

        const load = async () => {
            try {
                const tempuser = await currentuser();
                setuser({ ...tempuser })
            } catch (error) {
                console.log(error)
                setuser(undefined)
            }
        }
        load()
    }, [])


    return (
        <UserContext.Provider value={{ user, setuser }}>
            {children}
        </UserContext.Provider>
    )
}

