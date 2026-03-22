<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFeedbackRequest;
use App\Http\Requests\UpdateFeedbackRequest;
use App\Models\Feedback;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $feedbacks = Feedback::query()
            ->when($request->has('username'), fn ($query) =>
                $query->where('username', 'like', "%{$request['username']}%")
            )
            ->orderBy('created_at', 'desc')
            ->paginate((int) $request->per_page);

        return response()->json($feedbacks, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFeedbackRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('feedback', 'public');
            $data['image'] = url('storage/' . $path);
        }

        $feedback = Feedback::create($data);

        return response()->json($feedback, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Feedback $feedback): JsonResponse
    {
        return response()->json($feedback, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeedbackRequest $request, Feedback $feedback): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            try {
                if ($feedback->image) {
                    $image_name = explode('feedback/', $feedback->image);
                    Storage::disk('public')->delete('feedback/' . $image_name[1]);
                }
            } catch (Throwable) {
                // evita quebra caso dê erro ao deletar
            } finally {
                $path = $request->file('image')->store('feedback', 'public');
                $data['image'] = url('storage/' . $path);
            }
        }

        $feedback->update($data);

        return response()->json($feedback, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feedback $feedback): JsonResponse
    {
        try {
            if ($feedback->image) {
                $image_name = explode('feedback/', $feedback->image);
                Storage::disk('public')->delete('feedback/' . $image_name[1]);
            }
        } catch (Throwable) {
            // ignora erro ao deletar imagem
        }

        $feedback->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}