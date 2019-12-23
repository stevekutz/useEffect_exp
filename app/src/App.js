import React , {useEffect} from 'react';
import {useState} from 'reinspect';
import axios from 'axios';
import {List, Image, Input} from 'semantic-ui-react';
import smiley from './img/happysmiley.jpg';
import colorBurst from './img/ColourSurge1.jpg';


const App = () => {

    // the API requires data.hits

    const [data, setFetchedData] = useState({ hits: [] }, 'Fetched Data');
    const [search, setSearch] = useState('redux', 'Search Term')

    useEffect(() => {
      const fetched = async () => {
        const fetchResult = await axios(
          `https://hn.algolia.com/api/v1/search?query=${search}`,
        );
        setFetchedData(fetchResult.data);
      };
      fetched();
    }, [search]);


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
               // onChange = {(e)  => setSearch(e.target.value)}
               onChange = {handleInput}
               value = {search}
            
            />


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
