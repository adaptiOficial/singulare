<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInscriptionRequest;
use App\Http\Requests\UpdateInscriptionRequest;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;
use App\Models\Inscription;

class InscriptionsController extends Controller
{
    private Inscription $inscription;

    public function __construct(Inscription $inscription)
    {
        $this->inscription = $inscription;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $inscriptions = $this->inscription->newQuery()
            ->when($request->has('nome'), function ($query) use ($request) {
                $query->where('nome', 'like', "%{$request->nome}%");
            })
            ->when($request->has('done'), function ($query) use ($request) {
                $query->where('done', $request->done);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($inscriptions, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInscriptionRequest $request): JsonResponse
    {
        $data = $request->validated();

        $inscription = Inscription::create($data);

        return response()->json($inscription, Response::HTTP_CREATED);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInscriptionRequest $request, string $id): JsonResponse
    {
        $inscription = $this->inscription->findOrFail($id);

        $data = $request->validated();

        $inscription->update($data);

        return response()->json($inscription, Response::HTTP_OK);
    }
}
