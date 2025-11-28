"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewMocPage() {
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState("");

    // Initialize date on client side to avoid hydration mismatch
    useEffect(() => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        setCurrentDate(formattedDate);
    }, []);

    const [formData, setFormData] = useState({
        requester: "John Smith",
        title: "",
        type: "",
        reasonForChange: "",
        estimatedBenefit: "",
        estimatedCost: "",
        estimatedStartDate: "",
        estimatedEndDate: "",
        background: "",
        objective: "",
        target: "",
        attachments: [] as File[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...newFiles] }));
        }
    };

    const removeFile = (index: number) => {
        setFormData(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (status: string) => {
        // Basic Validation
        if (!formData.title || !formData.type || !formData.reasonForChange || !formData.estimatedBenefit ||
            !formData.estimatedCost || !formData.estimatedStartDate || !formData.estimatedEndDate ||
            !formData.background || !formData.objective || formData.attachments.length === 0) {
            alert("Please fill in all required fields and upload at least one attachment.");
            return;
        }

        try {
            // Prepare payload for API
            const payload = {
                title: formData.title,
                type: formData.type,
                reasonForChange: formData.reasonForChange,
                estimatedBenefit: parseFloat(formData.estimatedBenefit),
                estimatedCost: parseFloat(formData.estimatedCost),
                estimatedStartDate: formData.estimatedStartDate,
                estimatedEndDate: formData.estimatedEndDate,
                background: formData.background,
                objective: formData.objective,
                target: formData.target,
                // Attachments would typically be uploaded to a separate endpoint or as FormData
                // For this stub, we just send the metadata
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090'}/api/MocRequests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`MoC Request ${status === 'Draft' ? 'Saved as Draft' : 'Submitted'} Successfully! ID: ${data.id}`);
                router.push("/"); // Redirect to home
            } else {
                alert('Failed to create MoC Request');
                console.error('Error:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the MoC Request');
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-900">New MoC Request</h1>

                {/* AI Chatbot Widget */}
                <div className="w-80 bg-blue-50 border border-blue-200 rounded-lg shadow-sm p-3 flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 text-blue-800 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-bold">AI Assistant</span>
                    </div>
                    <textarea
                        className="w-full text-sm border-blue-200 rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 resize-none"
                        rows={2}
                        placeholder="Ask AI to help fill this form..."
                    ></textarea>
                    <button className="self-end px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors">
                        Ask AI
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                {/* Header Section */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Requester</label>
                        <input
                            type="text"
                            value={formData.requester}
                            readOnly
                            className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-600 focus:outline-none cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                        <input
                            type="text"
                            value={currentDate}
                            readOnly
                            className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-600 focus:outline-none cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="p-6 space-y-8">
                    {/* MoC Info Section */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">MOC Info</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">MOC Title <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                    placeholder="Enter MOC Title"
                                />
                            </div>

                            <div className="w-full md:w-1/3">
                                <label className="block text-sm font-bold text-gray-700 mb-1">Type <span className="text-red-500">*</span></label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                >
                                    <option value="">Please select</option>
                                    <option value="Permanent">Permanent</option>
                                    <option value="Temporary">Temporary</option>
                                    <option value="Overriding">Overriding</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Reason for changes <span className="text-red-500">*</span></label>
                                <textarea
                                    name="reasonForChange"
                                    value={formData.reasonForChange}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                    placeholder="Describe the reason for changes..."
                                ></textarea>
                            </div>
                        </div>
                    </section>

                    {/* Estimated Benefit / Cost / Duration Section */}
                    <section className="bg-gray-50 p-6 rounded-md border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Estimated Benefit / Cost / Duration</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Estimated Benefit (THB) <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    name="estimatedBenefit"
                                    value={formData.estimatedBenefit}
                                    onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Estimated Cost (THB) <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    name="estimatedCost"
                                    value={formData.estimatedCost}
                                    onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Estimated Duration - Start Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    name="estimatedStartDate"
                                    value={formData.estimatedStartDate}
                                    onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Estimated Duration - End Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    name="estimatedEndDate"
                                    value={formData.estimatedEndDate}
                                    onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Change Description Section */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Change Description</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Background <span className="text-red-500">*</span></label>
                                <textarea
                                    name="background"
                                    value={formData.background}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Objective <span className="text-red-500">*</span></label>
                                <textarea
                                    name="objective"
                                    value={formData.objective}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Target</label>
                                <textarea
                                    name="target"
                                    value={formData.target}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                ></textarea>
                            </div>
                        </div>
                    </section>

                    {/* Attachments Section */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Attachments <span className="text-red-500">*</span></h2>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500">(For example, Basic design of change, Relevant document such as photo, drawing.)</p>
                            <div className="flex items-center space-x-4">
                                <label className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300 font-medium">
                                    Browse
                                    <input type="file" multiple className="hidden" onChange={handleFileChange} />
                                </label>
                                <span className="text-sm text-gray-500">{formData.attachments.length} file(s) selected</span>
                            </div>

                            {formData.attachments.length > 0 && (
                                <ul className="mt-4 space-y-2">
                                    {formData.attachments.map((file, index) => (
                                        <li key={index} className="flex items-center space-x-2 text-sm text-blue-600">
                                            <span>{file.name}</span>
                                            <button
                                                onClick={() => removeFile(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="flex items-center space-x-4 pt-8 border-t border-gray-200">
                        <button
                            onClick={() => handleSubmit('Draft')}
                            className="px-8 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 font-bold shadow-sm"
                        >
                            SAVE DRAFT
                        </button>
                        <button
                            onClick={() => handleSubmit('Submitted')}
                            className="px-8 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 font-bold shadow-sm"
                        >
                            SUBMIT
                        </button>
                        <Link
                            href="/"
                            className="px-8 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 font-bold shadow-sm"
                        >
                            DISCARD
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
