<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return response()->json($posts, 200);
    }

    public function create(Request $request)
    {
        $post = new Post;
        $post->name = $request->name;
        $post->content = $request->content;
        $post->save();
        return response()->json($post, 200);
    }

    public function edit(Request $req) 
    {
        $post = Post::find($req->id);
        return $post;
    }

    public function update(Request $req)
    {
        $post = Post::find($req->id);
        $post->name = $req->name;
        $post->content = $req->content;
        $post->save();
        $posts = Post::all();
        return posts;
    }
}

