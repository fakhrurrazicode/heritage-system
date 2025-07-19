<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravolt\Indonesia\Models\Province;
use Laravolt\Indonesia\Models\City;
use Laravolt\Indonesia\Models\District;
use Laravolt\Indonesia\Models\Village;

class IndonesiaController extends Controller
{
    public function provinces()
    {
        $provinces = Province::orderBy('name')->get(['code', 'name']);
        return response()->json($provinces);
    }

    public function cities(Request $request)
    {
        $province_code = $request->query('province_code');
        if (!$province_code) {
            return response()->json([], 400);
        }

        $cities = City::where('province_code', $province_code)
            ->orderBy('name')
            ->get(['code', 'name']);
        return response()->json($cities);
    }

    public function districts(Request $request)
    {
        $city_code = $request->query('city_code');
        if (!$city_code) {
            return response()->json([], 400);
        }

        $districts = District::where('city_code', $city_code)
            ->orderBy('name')
            ->get(['code', 'name']);
        return response()->json($districts);
    }

    public function villages(Request $request)
    {
        $district_code = $request->query('district_code');
        if (!$district_code) {
            return response()->json([], 400);
        }

        $villages = Village::where('district_code', $district_code)
            ->orderBy('name')
            ->get(['code', 'name']);
        return response()->json($villages);
    }
}
