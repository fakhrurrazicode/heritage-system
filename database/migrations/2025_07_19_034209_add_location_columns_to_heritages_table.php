<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLocationColumnsToHeritagesTable extends Migration
{
    public function up()
    {
        Schema::table('heritages', function (Blueprint $table) {
            $table->string('province_code', 2)->nullable()->after('heritage_type_id');
            $table->string('city_code', 4)->nullable()->after('province_code');
            $table->string('district_code', 7)->nullable()->after('city_code');
            $table->string('village_code', 10)->nullable()->after('district_code');

            // Jika ingin, bisa juga menambahkan index agar pencarian lebih cepat
            $table->index('province_code');
            $table->index('city_code');
            $table->index('district_code');
            $table->index('village_code');
        });
    }

    public function down()
    {
        Schema::table('heritages', function (Blueprint $table) {
            $table->dropIndex(['province_code']);
            $table->dropIndex(['city_code']);
            $table->dropIndex(['district_code']);
            $table->dropIndex(['village_code']);

            $table->dropColumn(['province_code', 'city_code', 'district_code', 'village_code']);
        });
    }
}
