<?php

namespace App\Http\Controllers;

use App\Http\Requests\PriceRequest;
use App\Models\Price;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class PriceController extends Controller
{
    private Price $price;

    public function __construct(Price $price)
    {
        $this->price = $price;
    }

    public function index(Request $request): JsonResponse
    {
        $prices = $this->price
            ->newQuery()
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($prices, Response::HTTP_OK);
    }

    public function store(PriceRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('price', 'public');
            $data['image'] = url('storage/' . $path);
        }

        $price = Price::create($data);

        return response()->json($price, Response::HTTP_CREATED);
    }

    public function show(string $id): JsonResponse
    {
        $price = $this->price->findOrFail($id);

        return response()->json($price, Response::HTTP_OK);
    }

    public function update(PriceRequest $request, string $id): JsonResponse
    {
        $price = $this->price->findOrFail($id);

        $data = $request->validated();

        if ($request->hasFile('image')) {
            try {
                if ($price->image) {
                    $image_name = explode('price/', $price->image);

                    Storage::disk('public')
                        ->delete('price/' . $image_name[1]);
                }
            } catch (Throwable) {
            } finally {
                $path = $request->file('image')->store('price', 'public');
                $data['image'] = url('storage/' . $path);
            }
        }

        $price->update($data);

        return response()->json($price, Response::HTTP_OK);
    }

    public function destroy(string $id): JsonResponse
    {
        $price = $this->price->findOrFail($id);

        $price->delete();

        return response()->json(
            ['message' => 'Preço removido com sucesso'],
            Response::HTTP_OK
        );
    }
}