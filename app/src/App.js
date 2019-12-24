import React , {useEffect} from 'react';
import {useState} from 'reinspect';
import axios from 'axios';
import {Button, Dimmer, Form ,List, Image, Input, Loader, Progress, Segment} from 'semantic-ui-react';
import smiley from './img/happysmiley.jpg';
import colorBurst from './img/ColourSurge1.jpg';


const App = () => {

    // the API requires data.hits

    const [data, setFetchedData] = useState({ hits: [] }, 'Fetched Data');
    const [searchInput, setSearch] = useState('redux', 'Search');
    const [storyInput, setStory] = useState('news', 'Story Input' );
    // This is one way to manually set search value to search for instead of allowing
    // evey keystroke change it
    //const [searchTerm, setSearchTerm] = useState('redux', 'Search Term')

    // A better method avoids using same value for default state
    const [url, setURL] = useState( `https://hn.algolia.com/api/v1/search?query=redux`, "URL selected"
    );
    const [isLoading, setIsLoading] = useState(false, 'Loading State');
    const [isError, setIsError] = useState(false, 'Error Loading State');
    const [errorMsg, setErrorMsg] = useState('', 'Error Message');


    useEffect(() => {

        const fetched = async () => {
            setIsLoading(true);
            setIsError(false);

            try {
            const fetchResult = await axios (url);

            setFetchedData(fetchResult.data);
            } catch (error){
                setIsError(true);
                setErrorMsg(error.toString());       
            }    

            setIsLoading(false);
        };

        fetched();
    }, [url]);


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
            <Segment.Group horizontal>
                <Segment>
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
                </Segment>
                <Segment>
                    <Form
                        onSubmit = {(e) => {setURL(`https://hn.algolia.com/api/v1/search_by_date?tags=${storyInput}`)
                        e.preventDefault()
                    }}                        
                    >
                        <Input
                            type = 'text'
                            value = {storyInput}
                            onChange = {(e)  => setStory(e.target.value)}
                        />
                        <Button type = 'submit'> Search Story</Button>
                    </Form>
                
                
                
                </Segment>
                <Segment>
                    <Button
                    type = 'button'
                    // onClick = {() => setSearchTerm(searchInput)}
                    onClick = {() => setURL(`http://hn.algolia.com/api/v1/search?tags=front_page`)}

                    > Latest </Button>
                </Segment>
            
            
            
            </Segment.Group>

            {isError && <Progress  percent={100} color = 'yellow' value = {errorMsg}> {errorMsg} </Progress>}
            {isLoading 
                ? 
                   <Dimmer active >
                        <Loader content = 'Loading'/>
                   </Dimmer>
                :
                    <List>
                        
                        {data.hits.map(item => (
                            <List.Item key={item.objectID}>
                                <Image src = {smiley}   size = 'mini' verticalAlign = 'middle' rounded spaced = 'left'/>
                                <a style = {{color: 'lightgrey', padding: '2px'}} href={item.url}>{item.title}</a>
                            </List.Item>
                        ))}

                    </List>
            }
        </div>
    );


}

export default App;
