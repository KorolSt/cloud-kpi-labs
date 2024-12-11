import React, { useEffect, useState } from "react";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000")
            .then((response) => response.text())
            .then((data) => setMessage(data));
    }, []);

    return <div>{message}</div>;
}

export default App;
