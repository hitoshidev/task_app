
import React from 'react';
import { Button, Card } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import MainTable from '../components/MainTable'
import axios from 'axios';

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
    
    useEffect(() => {
        getPostsData();
    }, []);
    
    const getPostsData = () => {
        axios.get('api/posts')
            .then(response => {
                console.log(response.status)
                console.log(response.data);
                setPosts(response.data);
            })
            .catch(() => {
                console.log('error connect');
            });
    };

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
