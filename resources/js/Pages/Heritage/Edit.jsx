import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router, Link } from "@inertiajs/react";

export default function Edit() {
    const { heritage, types, auth } = usePage().props;
    const [form, setForm] = useState({
        name: heritage.name || "",
        heritage_type_id: heritage.heritage_type_id || "",
        location: heritage.location || "",
        description: heritage.description || "",
    });

    useEffect(() => {
        setForm({
            name: heritage.name || "",
            heritage_type_id: heritage.heritage_type_id || "",
            location: heritage.location || "",
            description: heritage.description || "",
        });
    }, [heritage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/heritage/${heritage.id}`, form);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Data Cagar Budaya" />

            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">
                    Edit Data Cagar Budaya
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

                    <div>
                        <label className="label">
                            <span className="label-text">Lokasi</span>
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
                        ></textarea>
                    </div>

                    <div className="flex gap-2">
                        <button className="btn btn-primary" type="submit">
                            Update
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
