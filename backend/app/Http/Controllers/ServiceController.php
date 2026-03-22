<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceRequest;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class ServiceController extends Controller
{
    private Service $service;
    public function __construct(Service $service){
        $this->service = $service;
    }

    public function index(Request $request): JsonResponse
    {
        $service = $this->service->newQuery()->when($request->has('search'), function($query) use ($request){
            $query->where('text', 'like', '%'.$request->search.'%');
        })->orderBy('id', 'desc')->paginate(10);
        return response()->json($service, Response::HTTP_OK);
    }

    public function store(ServiceRequest $request): JsonResponse
    {
        $data = $request->validated();

        if($request->hasFile('image')){
            $path = $request->file('image')->store('service', 'public');
            $data['image'] = url('storage/'.$path);
        }

        $service = Service::create($data);
        return response()->json($service, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $service = $this->service->findOrFail($id);

        return response()->json($service, Response::HTTP_OK);
    }

    public function update(ServiceRequest $request, string $id): JsonResponse
    {
        $service = $this->service->findOrFail($id);
        $data = $request->validated();
        if($request->hasFile('image')){
            try{
                if($service['image']){
                    $image_name = explode('service/', $service['image']);
                    Storage::disk('public')->delete('service/'.$image_name[1]);
                }
            }catch(Throwable){
            }finally{
                $path = $request->file('image')->store('service', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }
        $service->update($data);
        return response()->json($service, Response::HTTP_OK);
    }

     /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $service = $this->service->findOrfail($id);
        Storage::disk('public')->delete($service->image);
        $service->delete();

        return response()->json($service, Response::HTTP_OK);
    }

}