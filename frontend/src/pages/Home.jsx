import { useState, useEffect } from 'react';

function Home() {
    const [count, setCount] = useState(0)

    return (
        <div className="Home">
        <h1>Clifford</h1>
        <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
            </button>
        </div>
        </div>
    )
}

export default Home;