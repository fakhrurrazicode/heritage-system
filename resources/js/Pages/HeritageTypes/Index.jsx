import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";

export default function Index({ auth, types, flash }) {
    const [form, setForm] = useState({ name: "", description: "" });
    const [editId, setEditId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            router.put(`/heritage-types/${editId}`, form);
        } else {
            router.post("/heritage-types", form);
        }
        setForm({ name: "", description: "" });
        setEditId(null);
    };

    const handleEdit = (type) => {
        setEditId(type.id);
        setForm({ name: type.name, description: type.description || "" });
    };

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus?")) {
            router.delete(`/heritage-types/${id}`);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Master Jenis Cagar Budaya" />

            <div className="p-6 max-w-4xl mx-auto">
                <div className="text-2xl font-bold mb-4">
                    Master Jenis Cagar Budaya
                </div>

                {flash.success && (
                    <div className="alert alert-success mb-4">
                        <span>{flash.success}</span>
                    </div>
                )}

                <div className="card bg-base-100 shadow mb-6">
                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Nama Jenis
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Contoh: Bangunan Cagar Budaya"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Deskripsi (opsional)
                                    </span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Deskripsi singkat tentang jenis ini..."
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
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    {editId ? "Update" : "Tambah"}
                                </button>
                                {editId && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditId(null);
                                            setForm({
                                                name: "",
                                                description: "",
                                            });
                                        }}
                                        className="btn btn-neutral"
                                    >
                                        Batal
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Deskripsi</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {types.map((type) => (
                                <tr key={type.id}>
                                    <td>{type.name}</td>
                                    <td>{type.description || "-"}</td>
                                    <td className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(type)}
                                            className="btn btn-sm btn-info"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(type.id)
                                            }
                                            className="btn btn-sm btn-error"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
