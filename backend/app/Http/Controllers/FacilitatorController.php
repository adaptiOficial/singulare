<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateFacilitatorRequest;
use App\Http\Requests\StoreFacilitatorRequest;
use App\Models\Facilitator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class FacilitatorController extends Controller
{
    private Facilitator $facilitator;

    public function __construct(Facilitator $facilitator)
    {
        $this->facilitator = $facilitator;
    }

    public function index(Request $request): JsonResponse
    {
        $facilitator = $this->facilitator->newQuery()->when($request->has('name'), function($query) use ($request){
            $query->where('name', 'like', '%'.$request->name.'%');
        })->orderBy('id', 'desc')->paginate(10);
        return response()->json($facilitator, Response::HTTP_OK);
    }

    public function store(StoreFacilitatorRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('facilitator', 'public');
            $data['image'] = url('storage/'.$path);
        }

        $facilitator = Facilitator::create($data);
        return response()->json($facilitator, Response::HTTP_CREATED);
    }

    public function show(string $id): JsonResponse
    {
        $facilitator = $this->facilitator->findOrFail($id);

        return response()->json($facilitator, Response::HTTP_OK);
    }

    public function update(UpdateFacilitatorRequest $request, string $id): JsonResponse
    {
        $facilitator = $this->facilitator->findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('image')) {
            try {
                if ($facilitator['image']) {
                    $image_name = explode('facilitator/', $facilitator['image']);
                    Storage::disk('public')->delete('facilitator/'.$image_name[1]);
                }
            } catch (Throwable) {
            } finally {
                $path = $request->file('image')->store('facilitator', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }

        $facilitator->update($data);
        return response()->json($facilitator, Response::HTTP_OK);

    }

    public function destroy(string $id): JsonResponse
    {
        $facilitator = $this->facilitator->findOrFail($id);
        $facilitator->delete();

        return response()->json(
            ['message' => 'Facilitator deleted successfully'],
            Response::HTTP_OK
        );
    }
}
