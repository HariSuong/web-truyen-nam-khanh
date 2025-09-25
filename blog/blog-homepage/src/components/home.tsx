import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import postsData from '../data/posts';

const Home: React.FC = () => {
    return (
        <div className="home">
            <h1>Welcome to the Blog</h1>
            <div className="posts">
                {postsData.map(post => (
                    <Card 
                        key={post.id} 
                        title={post.title} 
                        content={post.content} 
                        actions={
                            <Button onClick={() => alert(`Read more about ${post.title}`)}>
                                Read More
                            </Button>
                        } 
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;