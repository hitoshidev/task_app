
import React from 'react';
import { Button, Card } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';

import MainTable from '../components/MainTable'
import PostForm from '../components/PostForm'


const useStyles = makeStyles((theme) => createStyles({
    card: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
}));

//ヘッダーのコンテンツ用の配列定義
const headerList = ['名前', 'タスク内容', '編集', '完了'];

function Home() {

    const classes = useStyles();

    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({name:'', content:''});
    
    useEffect(() => {
        getPostsData();
    }, []);
    
    const getPostsData = () => {
        axios.get('api/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(() => {
                console.log('error connect');
            });
    };

    const inputChange = e => {
        console.log('inputChange called');
        const key = e.target.name;
        const value = e.target.value;
        formData[key] = value;
        let data = Object.assign({}, formData);
        setFormData(data);
        console.log(formData);
    };

    const createPost = async() => {
        if(formData == '') { return; }

        await axios.post('/api/post/create', {
            name: formData.name,
            content: formData.content
        })
        .then(res => {
            const tmp = posts;
            tmp.push(res.data);
            setPosts(tmp);
            setFormData('');
        })
        .catch(err => {
            console.log(error);
        });
    }

    let rows = [];
    posts.map((post) => 
        rows.push({
            name: post.name,
            content: post.content,
            editBtn: <Button color="secondary" variant="contained">編集</Button>,
            deleteBtn: <Button color="primary" variant="contained">完了</Button>,
        })
    );



    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <h1>タスク管理</h1>
                        <Card className={classes.card}>
                            <PostForm data={formData} inputChange={inputChange} btnFunc={createPost}/>
                        </Card>
                        <Card className={classes.card}>
                            {/* テーブル部分の定義 */}
                            <MainTable headerList={headerList} rows={rows} />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
