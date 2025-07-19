<?php

namespace App\Http\Controllers;

use App\Models\HeritageType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HeritageTypeController extends Controller
{
    public function index()
    {
        $types = HeritageType::latest()->get();
        return Inertia::render('HeritageTypes/Index', [
            'types' => $types
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:heritage_types,name',
            'description' => 'nullable|string',
        ]);

        HeritageType::create($validated);

        return redirect()->route('heritage-types.index')->with('success', 'Jenis cagar budaya ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $type = HeritageType::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|unique:heritage_types,name,' . $type->id,
            'description' => 'nullable|string',
        ]);

        $type->update($validated);

        return redirect()->route('heritage-types.index')->with('success', 'Jenis cagar budaya diperbarui');
    }

    public function destroy($id)
    {
        HeritageType::findOrFail($id)->delete();

        return redirect()->route('heritage-types.index')->with('success', 'Jenis cagar budaya dihapus');
    }
}
