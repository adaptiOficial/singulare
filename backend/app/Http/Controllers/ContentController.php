<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Http\Controllers\Controller;
use App\Http\Requests\ContentRequest;
use App\Http\Requests\StoreContentRequest;
use App\Http\Requests\UpdateContentRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class ContentController extends Controller
{
    private Content $content;
    public function __construct(Content $content){
        $this->content = $content;
    }

    public function index(Request $request): JsonResponse
    {
        $content = $this->content->newQuery()->when($request->has('search'), function($query) use ($request){
            $query->where('text', 'like', '%'.$request->search.'%');
        })->orderBy('id', 'desc')->paginate(10);
        return response()->json($content, Response::HTTP_OK);
    }

    public function store(ContentRequest $request): JsonResponse
    {
        $data = $request->validated();

        if($request->hasFile('image')){
            $path = $request->file('image')->store('content', 'public');
            $data['image'] = url('storage/'.$path);
        }

        $content = Content::create($data);
        return response()->json($content, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $content = $this->content->findOrFail($id);

        return response()->json($content, Response::HTTP_OK);
    }

    public function update(ContentRequest $request, string $id): JsonResponse
    {
        $content = $this->content->findOrFail($id);
        $data = $request->validated();
        if($request->hasFile('image')){
            try{
                if($content['image']){
                    $image_name = explode('content/', $content['image']);
                    Storage::disk('public')->delete('content/'.$image_name[1]);
                }
            }catch(Throwable){
            }finally{
                $path = $request->file('image')->store('content', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }
        $content->update($data);
        return response()->json($content, Response::HTTP_OK);
    }

     /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $content = $this->content->findOrfail($id);
        Storage::disk('public')->delete($content->image);
        $content->delete();

        return response()->json($content, Response::HTTP_OK);
    }

}