import React from "react"
import ReactGa from "react-ga"
import { useLocation } from "react-router-dom"

export const Wrapper = (props) => {
    const location = useLocation()

    React.useEffect(() => {
        if(props.initialized) {
            // console.log(location.pathname + location.search)
            ReactGa.pageview(location.pathname + location.search)
        }
    }, [props.initialized, location])
    return <></>
}
