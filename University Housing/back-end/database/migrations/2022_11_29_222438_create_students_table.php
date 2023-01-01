<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('firstName');
            $table->string('lastName');
            // $table->string('EfirstName');
            // $table->string('ElastName');
            $table->string('fatherName');
            // $table->string('motherName');
            $table->date('birthDay');
            $table->string('college');
            // $table->string('section');
            $table->string('level');
            // $table->string('city');
            // $table->string('distance');
            // $table->string('financial');
            $table->integer('room');
            $table->string('phoneNumber');
            // $table->string('guardianPhoneNumber');
            // $table->string('brothersNum');
            // $table->string('marital');
            // $table->integer('sonsNum')->default('0');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
};
