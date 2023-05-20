import { useEffect, useLayoutEffect } from "react";


 const Redirect = () => {
    useLayoutEffect(() => {
        window.location.href = `https://eduglobetech.com/no-name/`
    }, [])
    return <></>
}

export default Redirect;