import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router, Link } from "@inertiajs/react";

export default function Create() {
    const { auth, types, provinces } = usePage().props;

    const [form, setForm] = useState({
        name: "",
        heritage_type_id: "",
        province_code: "",
        city_code: "",
        district_code: "",
        village_code: "",
        description: "",
        location: "",
    });

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    useEffect(() => {
        if (form.province_code) {
            fetch(`/api/indonesia/cities?province_code=${form.province_code}`)
                .then((res) => res.json())
                .then((data) => {
                    setCities(data);
                    setDistricts([]);
                    setVillages([]);
                    setForm((prev) => ({
                        ...prev,
                        city_code: "",
                        district_code: "",
                        village_code: "",
                    }));
                });
        } else {
            setCities([]);
            setDistricts([]);
            setVillages([]);
            setForm((prev) => ({
                ...prev,
                city_code: "",
                district_code: "",
                village_code: "",
            }));
        }
    }, [form.province_code]);

    useEffect(() => {
        if (form.city_code) {
            fetch(`/api/indonesia/districts?city_code=${form.city_code}`)
                .then((res) => res.json())
                .then((data) => {
                    setDistricts(data);
                    setVillages([]);
                    setForm((prev) => ({
                        ...prev,
                        district_code: "",
                        village_code: "",
                    }));
                });
        } else {
            setDistricts([]);
            setVillages([]);
            setForm((prev) => ({
                ...prev,
                district_code: "",
                village_code: "",
            }));
        }
    }, [form.city_code]);

    useEffect(() => {
        if (form.district_code) {
            fetch(`/api/indonesia/villages?district_code=${form.district_code}`)
                .then((res) => res.json())
                .then((data) => {
                    setVillages(data);
                    setForm((prev) => ({
                        ...prev,
                        village_code: "",
                    }));
                });
        } else {
            setVillages([]);
            setForm((prev) => ({
                ...prev,
                village_code: "",
            }));
        }
    }, [form.district_code]);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/heritage", form);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Data Cagar Budaya" />

            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">
                    Tambah Data Cagar Budaya
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Nama</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">
                                Jenis Cagar Budaya
                            </span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={form.heritage_type_id}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    heritage_type_id: e.target.value,
                                })
                            }
                            required
                        >
                            <option value="">Pilih jenis...</option>
                            {types.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Cascading lokasi */}
                    <div>
                        <label className="label">
                            <span className="label-text">Provinsi</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={form.province_code}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    province_code: e.target.value,
                                })
                            }
                            required
                        >
                            <option value="">-- Pilih Provinsi --</option>
                            {provinces.map((prov) => (
                                <option key={prov.code} value={prov.code}>
                                    {prov.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Kota / Kabupaten</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={form.city_code}
                            onChange={(e) =>
                                setForm({ ...form, city_code: e.target.value })
                            }
                            disabled={!form.province_code}
                            required
                        >
                            <option value="">
                                -- Pilih Kota / Kabupaten --
                            </option>
                            {cities.map((city) => (
                                <option key={city.code} value={city.code}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Kecamatan</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={form.district_code}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    district_code: e.target.value,
                                })
                            }
                            disabled={!form.city_code}
                            required
                        >
                            <option value="">-- Pilih Kecamatan --</option>
                            {districts.map((district) => (
                                <option
                                    key={district.code}
                                    value={district.code}
                                >
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Desa / Kelurahan</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={form.village_code}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    village_code: e.target.value,
                                })
                            }
                            disabled={!form.district_code}
                            required
                        >
                            <option value="">
                                -- Pilih Desa / Kelurahan --
                            </option>
                            {villages.map((village) => (
                                <option key={village.code} value={village.code}>
                                    {village.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">
                                Lokasi (alamat lengkap)
                            </span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={form.location}
                            onChange={(e) =>
                                setForm({ ...form, location: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Deskripsi</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="flex gap-2">
                        <button className="btn btn-primary" type="submit">
                            Simpan
                        </button>
                        <Link href="/heritage" className="btn btn-ghost">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
