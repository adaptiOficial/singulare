<?php

namespace App\Http\Controllers;

use App\Http\Requests\LinkWppRequest;
use App\Models\LinkWpp;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class LinkWppController extends Controller
{
    private LinkWpp $linkWpp;

    public function __construct(LinkWpp $linkWpp)
    {
        $this->linkWpp = $linkWpp;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $linkWpp = $this->linkWpp->newQuery()
            ->when($request->has('title'), fn ($query) => $query->orWhere('title', 'like', "%{$request['title']}%"))
            ->orderBy('created_at', 'desc')
            ->paginate((int) $request->per_page);

        return response()->json($linkWpp, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LinkWppRequest $request): JsonResponse
    {
        $data = $request->validated();
        $linkWpp = $this->linkWpp->create($data);

        return response()->json($linkWpp, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $linkWpp = $this->linkWpp->findOrFail($id);

        return Response()->json($linkWpp, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LinkWppRequest $request, $id): JsonResponse
    {
        $data = $request->validated();
        $linkWpp = $this->linkWpp->findOrFail($id);
        $linkWpp->update($data);

        return response()->json($linkWpp, Response::HTTP_OK);
    }

}