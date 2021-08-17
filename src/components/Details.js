import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import md5 from 'md5';

function Details(props) {
    // id é um prop de url (recebe o id do quadrinho específico)
    const { id } = useParams()
    const [results, setResults] = useState([])
    // estado quantity controla quantos quadrinhos o usuário "comprará"
    const [quantity, setQuantity] = useState(0)

    function onChange(ev) {
        const { name, value } = ev.target
        setQuantity(value)
    }
    function onClick() {
        // Adiciona um novo par ordenado no array que representa 
        // o carrino de compras. 
        props.setShoppingCart([...props.shoppingCart, [results[0], quantity]])
    }

    //As funções a seguir foram feitas apenas para uma maior 
    //organização de código.
    function HanddleStories() {
        //Lida com o display das histórias que compõe o quadrinho.
        let stories = ''
        results[0].stories.items.map(story => {
            stories += '"' + story.name + '", '
        })
        return stories.slice(0, -2) + '.'
    }
    function HanddlePublished() {
        //Lida com o display da data de publicação.
        if (results[0].dates.length > 0) {
            return results[0].dates[0].date.slice(0, 10)
        }
    }
    function HanddlePoster() {
        //Lida com o display da imagem do poster do quadrinho
        if (results.length > 0) {
            return (
                <img src={results[0].thumbnail.path + '.' + results[0].thumbnail.extension}
                    alt={`${results[0].title} Poster`} />
            )
        }
    }

    useEffect(() => {
        const time = Number(new Date())
        console.log(time)
        const hash = md5(time + process.env.REACT_APP_MARVEL_PRIVATE_KEY
            + process.env.REACT_APP_MARVEL_PUBLIC_KEY)
        console.log(hash)

        fetch(`http://gateway.marvel.com/v1/public/comics/${id}?ts=${time.toString()}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${hash}`)
            .then((response) => response.json())
            .then((data) => {
                if (!data.errors) {
                    setResults(data.data.results);
                    console.log(data.data.results[0]);
                } else {
                    setResults([]);
                }
            })
    }, [])



    return (
        <div className="details-page">
            <div className="container">
                <div className="details-content">

                    <div className="poster-wrapper">
                        {HanddlePoster()}
                    </div>

                    <div className="details-info">
                        {/* precisa verificar o estado do fetch pois é assíncrono */}
                        {results.length > 0 && (
                            <div>
                                <h1>{results[0].title}</h1>

                                <h2>Published: {HanddlePublished()}</h2>

                                <div className="details-creators">
                                    <h3>Creators:</h3>
                                    {results[0].creators.items.map((creator => {
                                        return (
                                            <h4>{creator.role}: {creator.name}</h4>
                                        )
                                    }))}
                                </div>

                                <div className="details-stories">
                                    <h3>Stories:</h3>
                                    <h4>{HanddleStories()}</h4>
                                </div>

                                <div className="details-price">
                                    <h3>Price:</h3>
                                    <h4>{results[0].prices[0].price}</h4>
                                </div>

                                <div className="details-buy">
                                    <input
                                        type="number"
                                        placeholder="how many?"
                                        onChange={onChange}
                                    />
                                    <button
                                        onClick={onClick}
                                        className="btn">Buy</button>
                                    {/* <p>{quantity}</p> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;
