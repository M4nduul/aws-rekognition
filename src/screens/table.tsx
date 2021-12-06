import { useContext, useEffect } from "react";
import { ScreenContainer } from ".";
import { AuthContext } from "../provider/authContext";
import axios from "axios";

const URL = 'https://ne963iy1ye.execute-api.ap-east-1.amazonaws.com/beta/attendences'

export const Table = () => {
    const { token } = useContext(AuthContext)

    useEffect(() => {
        console.log(token)

        const fetchData = async () => {

            axios.get(URL, {
                headers: {
                }
            }).then(res => {
                console.log(res)
            }).catch((e) => console.log(e))

        }

        if (token !== '') fetchData()

    }, [token])

    return (
        <ScreenContainer className="flex-col">

        </ScreenContainer>
    )
}