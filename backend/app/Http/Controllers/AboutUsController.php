<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use App\Http\Controllers\Controller;
use App\Http\Requests\AboutUsRequest;
use App\Http\Requests\StoreAboutUsRequest;
use App\Http\Requests\UpdateAboutUsRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class AboutUsController extends Controller
{
     private AboutUs $aboutUs;

    public function __construct(AboutUs $aboutUs)
    {
        $this->aboutUs = $aboutUs;
    }

    public function index(Request $request): JsonResponse
    {
        $aboutUs = $this->aboutUs->newQuery()
            ->when($request->has('search'), function ($query) use ($request) {
                $query->where('text', 'like', "%{$request->search}");
            })
            ->orderBy('id', 'asc')
            ->paginate(10);

            return response()->json($aboutUs, Response::HTTP_OK);
    }

    public function store(AboutUsRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('about-us', 'public');
            $data['image'] = url('storage/'.$path);
        }

        $aboutus = AboutUs::create($data);

        return response()->json($aboutus, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $aboutUs = $this->aboutUs->findOrFail($id);

        return response()->json($aboutUs, Response::HTTP_OK);
    }

    public function update(AboutUsRequest $request, string $id): JsonResponse
    {
        $aboutUs = $this->aboutUs->findOrFail($id);
        $data = $request->validated();
        if ($request->hasFile('image')) {
            try {
                if ($aboutUs['image']) {
                    $image_name = explode('about-us/', $aboutUs['image']);
                    Storage::disk('public')->delete('about-us/'.$image_name[1]);
                }
            } catch (Throwable) {
            } finally {
                $path = $request->file('image')->store('about-us', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }
         $aboutUs->update($data);

        return response()->json($aboutUs, Response::HTTP_OK);
    }

}