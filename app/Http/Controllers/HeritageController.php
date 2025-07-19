<?php

namespace App\Http\Controllers;

use App\Models\Heritage;
use App\Models\HeritageType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravolt\Indonesia\Models\Province;

class HeritageController extends Controller
{
    public function index(Request $request)
    {
        $query = Heritage::with('type')->latest();

        if ($request->heritage_type_id) {
            $query->where('heritage_type_id', $request->heritage_type_id);
        }

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $heritages = $query->paginate(10)->appends($request->only(['search', 'heritage_type_id']));
        $types = HeritageType::orderBy('name')->get();

        return Inertia::render('Heritage/Index', [
            'heritages' => $heritages,
            'types' => $types,
            'filters' => $request->only(['search', 'heritage_type_id']),
            'auth' => ['user' => Auth::user()],
        ]);
    }

    public function create()
    {
        $types = HeritageType::orderBy('name')->get();
        $provinces = Province::orderBy('name')->get();

        return Inertia::render('Heritage/Create', [
            'types' => $types,
            'provinces' => $provinces,
            'auth' => ['user' => Auth::user()],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'heritage_type_id' => 'required|exists:heritage_types,id',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'province_code' => 'nullable|string|size:2|exists:indonesia_provinces,code',
            'city_code' => 'nullable|string|size:4|exists:indonesia_cities,code',
            'district_code' => 'nullable|string|size:7|exists:indonesia_districts,code',
            'village_code' => 'nullable|string|size:10|exists:indonesia_villages,code',
        ]);

        Heritage::create($validated);

        return redirect()->route('heritage.index')->with('success', 'Data cagar budaya berhasil ditambahkan');
    }

    public function edit($id)
    {
        $heritage = Heritage::findOrFail($id);
        $types = HeritageType::orderBy('name')->get();
        $provinces = Province::orderBy('name')->get();

        return Inertia::render('Heritage/Edit', [
            'heritage' => $heritage,
            'types' => $types,
            'provinces' => $provinces,
            'auth' => ['user' => Auth::user()],
        ]);
    }

    public function update(Request $request, $id)
    {
        $heritage = Heritage::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'heritage_type_id' => 'required|exists:heritage_types,id',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'province_code' => 'nullable|string|size:2|exists:indonesia_provinces,code',
            'city_code' => 'nullable|string|size:4|exists:indonesia_cities,code',
            'district_code' => 'nullable|string|size:7|exists:indonesia_districts,code',
            'village_code' => 'nullable|string|size:10|exists:indonesia_villages,code',
        ]);

        $heritage->update($validated);

        return redirect()->route('heritage.index')->with('success', 'Data cagar budaya berhasil diperbarui');
    }

    public function destroy($id)
    {
        Heritage::findOrFail($id)->delete();

        return redirect()->route('heritage.index')->with('success', 'Data cagar budaya berhasil dihapus');
    }
}
