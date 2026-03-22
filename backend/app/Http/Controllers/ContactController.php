<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;
use App\Models\Contact;

class ContactController extends Controller
{
    private Contact $contact;

   public function __construct(Contact $contact){
        $this->contact = $contact;
    }

   public function index(Request $request): JsonResponse
    {
        $contact = $this->contact->newQuery()->when($request->has('done'), function($query) use ($request){
            $query->where('done', '=', $request->done);
        })->orderBy('created_at', 'desc')->paginate(10);
        return response()->json($contact, Response::HTTP_OK);
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
    public function store(StoreContactRequest $request): JsonResponse
    {
        $data = $request->validated();

        $contact = Contact::create($data);

        return response()->json($contact,Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContactRequest $request, string $id): JsonResponse
    {
        $contact = $this->contact->findOrFail($id);

        $data = $request->validated();

        $contact->update($data);

        return response()->json($contact, Response::HTTP_OK);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        //
    }
}
