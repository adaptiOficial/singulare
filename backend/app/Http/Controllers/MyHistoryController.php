<?php

namespace App\Http\Controllers;

use App\Models\MyHistory;
use App\Http\Controllers\Controller;
use App\Http\Requests\MyHistoryRequest;
use App\Http\Requests\StoreMyHistoryRequest;
use App\Http\Requests\UpdateMyHistoryRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class MyHistoryController extends Controller
{
    private MyHistory $my_history;
    public function __construct(MyHistory $my_history){
        $this->my_history = $my_history;
    }

    public function index(Request $request): JsonResponse
    {
        $my_history = $this->my_history->newQuery()->when($request->has('search'), function($query) use ($request){
            $query->where('text', 'like', '%'.$request->search.'%');
        })->orderBy('id', 'desc')->paginate(10);
        return response()->json($my_history, Response::HTTP_OK);
    }

    public function store(MyHistoryRequest $request): JsonResponse
    {
        $data = $request->validated();

        if($request->hasFile('image')){
            $path = $request->file('image')->store('my-history', 'public');
            $data['image'] = url('storage/'.$path);
        }

        $my_history = MyHistory::create($data);
        return response()->json($my_history, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $my_history = $this->my_history->findOrFail($id);

        return response()->json($my_history, Response::HTTP_OK);
    }

    public function update(MyHistoryRequest $request, string $id): JsonResponse
    {
        $my_history = $this->my_history->findOrFail($id);
        $data = $request->validated();
        if($request->hasFile('image')){
            try{
                if($my_history['image']){
                    $image_name = explode('my-history/', $my_history['image']);
                    Storage::disk('public')->delete('my-history/'.$image_name[1]);
                }
            }catch(Throwable){
            }finally{
                $path = $request->file('image')->store('my-history', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }
        $my_history->update($data);
        return response()->json($my_history, Response::HTTP_OK);
    }

}