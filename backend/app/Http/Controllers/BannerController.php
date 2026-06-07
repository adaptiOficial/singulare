<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Http\Controllers\Controller;
use App\Http\Requests\BannerRequest;
use App\Http\Requests\StoreBannerRequest;
use App\Http\Requests\UpdateBannerRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class BannerController extends Controller
{
    private Banner $banner;
    public function __construct(Banner $banner){
        $this->banner = $banner;
    }

    public function index(Request $request): JsonResponse
    {
        $banner = $this->banner->newQuery()->when($request->has('search'), function($query) use ($request){
            $query->where('title', 'like', '%'.$request->search.'%');
        })->orderBy('id', 'desc')->paginate(10);
        return response()->json($banner, Response::HTTP_OK);
    }

    public function store(BannerRequest $request): JsonResponse
    {
        $data = $request->validated();

        if($request->hasFile('image')){
            $path = $request->file('image')->store('banner', 'public');
            $data['image'] = url('storage/'.$path);
        }

        $banner = Banner::create($data);
        return response()->json($banner, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $banner = $this->banner->findOrFail($id);

        return response()->json($banner, Response::HTTP_OK);
    }

    public function update(BannerRequest $request, string $id): JsonResponse
    {
        $banner = $this->banner->findOrFail($id);
        $data = $request->validated();
        if($request->hasFile('image')){
            try{
                if($banner['image']){
                    $image_name = explode('banner/', $banner['image']);
                    Storage::disk('public')->delete('banner/'.$image_name[1]);
                }
            }catch(Throwable){
            }finally{
                $path = $request->file('image')->store('banner', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }
        $banner->update($data);
        return response()->json($banner, Response::HTTP_OK);
    }

}
