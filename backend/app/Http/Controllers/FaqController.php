<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFaqRequest;
use App\Http\Requests\UpdateFaqRequest;
use App\Models\Faq;
use Illuminate\Http\Response;

class FaqController extends Controller
{

private Faq $faq;
    public function __construct(Faq $faq){
        $this->faq = $faq;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $faq = $this->faq->paginate(10);

        return response()->json($faq, Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFaqRequest $request)
    {
        $data = $request->validated();
        
        $faq = Faq::create($data);

        return response()->json($faq,Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        {
        $faq = $this->faq->findOrFail($id);

        return response()->json($faq, Response::HTTP_OK);
    }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Faq $faq)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFaqRequest $request, string $id)
    {
        $faq = $this->faq->findOrFail($id);

        $data = $request->validated();

        $faq = $faq->update($data);

        return response()->json($faq, Response::HTTP_OK);
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

     $faq = $this->faq->findOrFail($id);
     $faq->delete();

     return response()->json($faq, Response::HTTP_OK);
        //
    }
}
