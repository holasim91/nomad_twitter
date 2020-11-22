import Tweet from 'components/Tweet'
import { dbService } from 'myBase'
import React, { useEffect, useState } from 'react'

const Home = ({userObj}) => {
    const [tweet, setTweet] = useState('')
    const [tweets, setTweets]=useState([])
    useEffect(() => {
        dbService.collection('tweet').onSnapshot(snapshot => {
            const tweetsArray = snapshot.docs.map((doc) =>({id: doc.id, ...doc.data()}) )
            setTweets(tweetsArray)
        })
    }, [])
    const onSubmit = async(e) =>{
        e.preventDefault()
        await dbService.collection('tweet').add({
            text:tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        })
        setTweet('')
    }
    const onChange = (e) =>{
        setTweet(e.target.value)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={tweet} onChange={onChange} type='text' placeholder="What's on your mind?" maxLength={120}/>
                <input type="submit" value='Tweet'/>
            </form>
            <div>
                {tweets.map( (t) => 
                    <Tweet key={t.id} tweetObj={t} isOwner={t.creatorId === userObj.uid} />
                )}
            </div>
        </div>
    )
}

export default Home
