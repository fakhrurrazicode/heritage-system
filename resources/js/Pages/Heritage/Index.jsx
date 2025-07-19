import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, router } from "@inertiajs/react";

export default function Index() {
    const { heritages, types, filters, auth, flash } = usePage().props;

    const [search, setSearch] = useState(filters.search || "");
    const [heritageTypeId, setHeritageTypeId] = useState(
        filters.heritage_type_id || ""
    );

    // Fungsi submit filter & search
    const submitFilter = () => {
        router.get(
            route("heritage.index"),
            { search, heritage_type_id: heritageTypeId },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Update saat input search / filter berubah (optional: bisa debounce)
    useEffect(() => {
        const timeout = setTimeout(() => {
            submitFilter();
        }, 500); // 500ms debounce

        return () => clearTimeout(timeout);
    }, [search, heritageTypeId]);

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus data ini?")) {
            router.delete(route("heritage.destroy", id), {
                onSuccess: () => {
                    // Bisa kasih toast notification atau reload data otomatis
                },
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Data Cagar Budaya" />

            <div className="p-6 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Data Cagar Budaya</h1>
                    <Link
                        href={route("heritage.create")}
                        className="btn btn-primary"
                    >
                        Tambah Baru
                    </Link>
                </div>

                {flash.success && (
                    <div className="alert alert-success mb-4">
                        {flash.success}
                    </div>
                )}

                {/* Search dan Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Cari nama cagar budaya..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered w-full sm:w-1/2"
                    />

                    <select
                        className="select select-bordered w-full sm:w-1/4"
                        value={heritageTypeId}
                        onChange={(e) => setHeritageTypeId(e.target.value)}
                    >
                        <option value="">-- Semua Jenis --</option>
                        {types.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Jenis</th>
                                <th>Lokasi</th>
                                <th>Deskripsi</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {heritages.data.length > 0 ? (
                                heritages.data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.type?.name || "-"}</td>
                                        <td>{item.location || "-"}</td>
                                        <td>{item.description || "-"}</td>
                                        <td className="flex gap-2">
                                            <Link
                                                href={route(
                                                    "heritage.edit",
                                                    item.id
                                                )}
                                                className="btn btn-sm btn-info"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="btn btn-sm btn-error"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center">
                                        Data tidak ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-center">
                    {heritages.links && (
                        <nav className="btn-group">
                            {heritages.links.map((link, index) => {
                                // Kadang link.label mengandung HTML (misal &laquo;), jadi kita harus render dengan dangerouslySetInnerHTML.
                                // Tapi <Link> tidak support dangerouslySetInnerHTML, jadi kita bisa buat komponen kecil untuk itu.
                                // Alternatif gampang: render label tanpa HTML entities, atau pakai 'span' di dalam <Link>.

                                // Cara aman: hilangkan tag HTML di label (seperti &laquo; atau &raquo;) pakai regex:
                                const labelText = link.label.replace(
                                    /&[^;]+;/g,
                                    (entity) => {
                                        if (entity === "&laquo;") return "«";
                                        if (entity === "&raquo;") return "»";
                                        return "";
                                    }
                                );

                                return link.url ? (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`btn btn-sm ${
                                            link.active
                                                ? "btn-primary"
                                                : "btn-outline"
                                        }`}
                                        preserveState
                                        preserveScroll
                                        as="button"
                                    >
                                        {labelText}
                                    </Link>
                                ) : (
                                    <button
                                        key={index}
                                        className="btn btn-sm btn-disabled"
                                        disabled
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                );
                            })}
                        </nav>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
