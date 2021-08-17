import React, { useState, useEffect } from 'react';
import md5 from 'md5';
import ResultCard from './ResultCard';

function Comics() {
    //o estado "results" recebe os dados da API, que são pegos no useEffect.
    const [results, setResults] = useState([])

    useEffect(() => {
        const time = Number(new Date())
        console.log(time)
        const hash = md5(time + process.env.REACT_APP_MARVEL_PRIVATE_KEY
            + process.env.REACT_APP_MARVEL_PUBLIC_KEY)
        console.log(hash)

        fetch(`http://gateway.marvel.com/v1/public/comics?ts=${time.toString()}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${hash}&limit=20`)
            .then((response) => response.json())
            .then((data) => {
                if (!data.errors) {
                    setResults(data.data.results);
                    console.log(data.data.results);
                } else {
                    setResults([]);
                }
            })
    }, [])



    return (
        <div className="comic-page">
            <div className="container">
                <div className="comic-content">
                    {results.length > 0 && (
                        <ul className="results">
                            {/* Para cada quadrinho será gerado um card */}
                            {results.map((comic) => (
                                <li key={comic.id}>
                                    <ResultCard comic={comic} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Comics;
