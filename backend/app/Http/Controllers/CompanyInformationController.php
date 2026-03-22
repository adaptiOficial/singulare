<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompanyInformationRequest;
use App\Http\Requests\UpdateCompanyInformationRequest;
use App\Models\CompanyInformation;
use Symfony\Component\HttpFoundation\Response;

class CompanyInformationController extends Controller
{

 private CompanyInformation $companyInformation;

    public function __construct(CompanyInformation $companyInformation)
    {
        $this->companyInformation = $companyInformation;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companyInformation = $this->companyInformation->all(['id','address', 'instagram', 'email', 'phone']);

        return response()->json($companyInformation[0],Response::HTTP_OK);
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
    public function store(StoreCompanyInformationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CompanyInformation $companyInformation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CompanyInformation $companyInformation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyInformationRequest $request, string $id)
    {

        $companyInformation = $this->companyInformation->findOrFail($id);

        $data = $request->validated();
        

        $companyInformation->update($data);
        

        return response()->json($request->all(), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CompanyInformation $companyInformation)
    {
        //
    }
}
