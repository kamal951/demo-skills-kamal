import { useEffect } from "react"

export default function close() {
    useEffect(() => {

        self.close();
    }, [])

    return (
        <>
            <p>Close</p>
        </>)
}

