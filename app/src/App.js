import React , {useEffect} from 'react';
import {useState} from 'reinspect';
import axios from 'axios';
import {Button, List, Image, Input} from 'semantic-ui-react';
import smiley from './img/happysmiley.jpg';
import colorBurst from './img/ColourSurge1.jpg';


const App = () => {

    // the API requires data.hits

    const [data, setFetchedData] = useState({ hits: [] }, 'Fetched Data');
    const [searchInput, setSearch] = useState('redux', 'Search');
    // This is one way to manually set search value to search for instead of allowing
    // evey keystroke change it
    //const [searchTerm, setSearchTerm] = useState('redux', 'Search Term')

    // A better method avoids using same value for default state
    const [url, setURL] = useState( `https://hn.algolia.com/api/v1/search?query=redux`, "URL selected"
    );

    useEffect(() => {
      const fetched = async () => {
        // const 
        // // const fetchResult = await axios(
        // //   `https://hn.algolia.com/api/v1/search?query=${search}`,
        // // `https://hn.algolia.com/api/v1/search?query=${searchTerm}`


        // );
        const fetchResult = await axios (url);

        setFetchedData(fetchResult.data);
      };

      fetched();
    }, [url]);
    
    // }, [searchTerm]);
    //}, [search]);


    // NOT needed it we use anonymous onChange handler
    const handleInput = (e, data) => {
        const {value} = e.target;
        setSearch(value);
    }


    return (
        <div style = {{
            backgroundImage: `url(${colorBurst})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            position: 'absolute',
            top: '0',
            left: '0',
            bottom: '0',
            right: '0',
            }}
        >
            <Input 
               type = 'text'
               onChange = {(e)  => setSearch(e.target.value)}
               //onChange = {handleInput}
               value = {searchInput}
            />

            <Button
                type = 'button'
                // onClick = {() => setSearchTerm(searchInput)}
                onClick = {() => setURL(`https://hn.algolia.com/api/v1/search?query=${searchInput}`)}

            > Search </Button>

            <List>
                
                {data.hits.map(item => (
                    <List.Item key={item.objectID}>
                        <Image src = {smiley}   size = 'mini' verticalAlign = 'middle' rounded spaced = 'left'/>
                        <a style = {{color: 'lightgrey', padding: '2px'}} href={item.uList}>{item.title}</a>
                    </List.Item>
                ))}

            </List>
        </div>
    );


}

export default App;
