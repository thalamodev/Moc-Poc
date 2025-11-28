"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewMocPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: "",
        category: "Plant Change",
        plantChangeType: "Standard change - affects multiple areas/systems",
        type: "Permanent",
        urgency: "Normal",
        initiatorDepartment: "Emergency Dept.",
        initiatorDivision: "Medical Services",
        location: "",
        scope: {
            mechanical: false,
            electrical: false,
            civil: false,
            process: false,
            procedure: false,
            control: false,
            sis: false,
        },
        detail: "",
        reasonForChange: "",
        benefits: "",
        assetsAffected: "",
        notificationNumber: "",
        riskLevel: "Low",
    });

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = async () => {
        try {
            // Transform scope object to string as required by API
            const payload = {
                ...formData,
                scope: JSON.stringify(formData.scope)
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/MocRequests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`MoC Request Created Successfully! ID: ${data.id}`);
                // Redirect or reset form here
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
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">New EMOC Request</h1>

            {/* Stepper */}
            <div className="flex items-center space-x-4">
                <div className={`flex items-center px-4 py-2 rounded-md ${step === 1 ? "bg-red-100 text-red-600 font-bold" : "bg-gray-100 text-gray-500"}`}>
                    <span className="mr-2">1.</span> Identify Change
                </div>
                <span className="text-gray-400">&gt;</span>
                <div className={`flex items-center px-4 py-2 rounded-md ${step === 2 ? "bg-green-100 text-green-600 font-bold" : "bg-gray-100 text-gray-500"}`}>
                    <span className="mr-2">2.</span> Detail Case for Change
                </div>
            </div>

            <div className="bg-white shadow rounded-lg p-8">
                {step === 1 && (
                    <div className="space-y-8">
                        {/* Category */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Category</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-6">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="category" className="form-radio text-blue-600" checked={formData.category === "Plant Change"} onChange={() => setFormData({ ...formData, category: "Plant Change" })} />
                                        <span>Plant Change</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="category" className="form-radio text-blue-600" checked={formData.category === "Maintenance Change"} onChange={() => setFormData({ ...formData, category: "Maintenance Change" })} />
                                        <span>Maintenance Change</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="category" className="form-radio text-blue-600" checked={formData.category === "Operation Override"} onChange={() => setFormData({ ...formData, category: "Operation Override" })} />
                                        <span>Operation Override</span>
                                    </label>
                                </div>

                                {formData.category === "Plant Change" && (
                                    <div className="ml-6 space-y-2 border-l-2 border-gray-200 pl-4">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input type="radio" name="plantChangeType" className="form-radio text-gray-600" checked={formData.plantChangeType.includes("multiple areas")} onChange={() => setFormData({ ...formData, plantChangeType: "Standard change - affects multiple areas/systems" })} />
                                            <span className="text-gray-600">Standard change - affects multiple areas/systems with proper documentation</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input type="radio" name="plantChangeType" className="form-radio text-gray-600" checked={formData.plantChangeType.includes("area/system")} onChange={() => setFormData({ ...formData, plantChangeType: "Standard change - affects area/system" })} />
                                            <span className="text-gray-600">Standard change - affects area/system with proper documentation</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input type="radio" name="plantChangeType" className="form-radio text-gray-600" checked={formData.plantChangeType.includes("Non-standard")} onChange={() => setFormData({ ...formData, plantChangeType: "Non-standard change" })} />
                                            <span className="text-gray-600">Non-standard change - affects equipment/process without proper approval procedure</span>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Type */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Type</h3>
                            <div className="flex items-center space-x-8">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" name="type" className="form-radio text-blue-600" checked={formData.type === "Permanent"} onChange={() => setFormData({ ...formData, type: "Permanent" })} />
                                    <div>
                                        <span className="block font-medium">Permanent</span>
                                        <span className="text-xs text-gray-500">More than 365 days</span>
                                    </div>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" name="type" className="form-radio text-blue-600" checked={formData.type === "Temporary"} onChange={() => setFormData({ ...formData, type: "Temporary" })} />
                                    <div>
                                        <span className="block font-medium">Temporary</span>
                                        <span className="text-xs text-gray-500">Less than 365 days from start date</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Urgency */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Urgency</h3>
                            <div className="flex items-center space-x-8">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" name="urgency" className="form-radio text-blue-600" checked={formData.urgency === "Normal"} onChange={() => setFormData({ ...formData, urgency: "Normal" })} />
                                    <span>Normal</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" name="urgency" className="form-radio text-red-600" checked={formData.urgency === "Emergency"} onChange={() => setFormData({ ...formData, urgency: "Emergency" })} />
                                    <span className="text-red-600 font-medium">Emergency</span>
                                </label>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                            <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
                                Cancel
                            </Link>
                            <button onClick={handleNext} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium">
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-md flex space-x-8 text-sm">
                            <div><span className="font-bold">Category:</span> {formData.category}</div>
                            <div><span className="font-bold">Type:</span> {formData.type}</div>
                            <div><span className="font-bold">Urgency:</span> <span className={formData.urgency === 'Emergency' ? 'text-red-600' : ''}>{formData.urgency}</span></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-1">MoC Title <span className="text-red-500">*</span></label>
                                <input type="text" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter MoC title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Initiator Department</label>
                                <input type="text" className="w-full border-gray-300 rounded-md shadow-sm bg-gray-50" value={formData.initiatorDepartment} readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Initiator Division</label>
                                <input type="text" className="w-full border-gray-300 rounded-md shadow-sm bg-gray-50" value={formData.initiatorDivision} readOnly />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-1">Location/Area/Terminal <span className="text-red-500">*</span></label>
                                <select className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}>
                                    <option value="">Select location...</option>
                                    <option value="Unit 1">Unit 1</option>
                                    <option value="Unit 2">Unit 2</option>
                                    <option value="Terminal A">Terminal A</option>
                                </select>
                            </div>
                        </div>

                        {/* Scope */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Scope</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <h4 className="text-sm font-semibold mb-2">Physical</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2"><input type="checkbox" className="rounded text-blue-600" checked={formData.scope.mechanical} onChange={(e) => setFormData({ ...formData, scope: { ...formData.scope, mechanical: e.target.checked } })} /> <span>Mechanical</span></label>
                                        <label className="flex items-center space-x-2"><input type="checkbox" className="rounded text-blue-600" checked={formData.scope.electrical} onChange={(e) => setFormData({ ...formData, scope: { ...formData.scope, electrical: e.target.checked } })} /> <span>Electrical</span></label>
                                        <label className="flex items-center space-x-2"><input type="checkbox" className="rounded text-blue-600" checked={formData.scope.civil} onChange={(e) => setFormData({ ...formData, scope: { ...formData.scope, civil: e.target.checked } })} /> <span>Civil</span></label>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold mb-2">Process</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2"><input type="checkbox" className="rounded text-blue-600" checked={formData.scope.process} onChange={(e) => setFormData({ ...formData, scope: { ...formData.scope, process: e.target.checked } })} /> <span>Process</span></label>
                                        <label className="flex items-center space-x-2"><input type="checkbox" className="rounded text-blue-600" checked={formData.scope.procedure} onChange={(e) => setFormData({ ...formData, scope: { ...formData.scope, procedure: e.target.checked } })} /> <span>Procedure</span></label>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold mb-2">Control</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2"><input type="checkbox" className="rounded text-blue-600" checked={formData.scope.control} onChange={(e) => setFormData({ ...formData, scope: { ...formData.scope, control: e.target.checked } })} /> <span>Control & Instrument (C&I)</span></label>
                                        <label className="flex items-center space-x-2"><input type="checkbox" className="rounded text-blue-600" checked={formData.scope.sis} onChange={(e) => setFormData({ ...formData, scope: { ...formData.scope, sis: e.target.checked } })} /> <span>Safety Instrument System (SIS)</span></label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text Areas */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Detail of the Change <span className="text-red-500">*</span></label>
                                <textarea rows={3} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter detail of the change..." value={formData.detail} onChange={(e) => setFormData({ ...formData, detail: e.target.value })}></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Reason for Change <span className="text-red-500">*</span></label>
                                <textarea rows={3} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter reason for change..." value={formData.reasonForChange} onChange={(e) => setFormData({ ...formData, reasonForChange: e.target.value })}></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Benefits <span className="text-red-500">*</span></label>
                                <textarea rows={3} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter benefits..." value={formData.benefits} onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Assets/Process affected</label>
                                <textarea rows={3} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter assets/process affected..." value={formData.assetsAffected} onChange={(e) => setFormData({ ...formData, assetsAffected: e.target.value })}></textarea>
                            </div>
                        </div>

                        {/* Noti Number */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Noti./PMO Number <span className="text-red-500">*</span></label>
                            <input type="text" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter notification/PMO number" value={formData.notificationNumber} onChange={(e) => setFormData({ ...formData, notificationNumber: e.target.value })} />
                        </div>

                        {/* Risk Level */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Risk Level <span className="text-red-500">*</span> <span className="text-xs font-normal text-gray-500">(if not implement change)</span></label>
                            <div className="flex space-x-6">
                                <label className="flex items-center space-x-2"><input type="radio" name="risk" className="text-blue-600" checked={formData.riskLevel === "Extremely High"} onChange={() => setFormData({ ...formData, riskLevel: "Extremely High" })} /> <span>Extremely High</span></label>
                                <label className="flex items-center space-x-2"><input type="radio" name="risk" className="text-blue-600" checked={formData.riskLevel === "High"} onChange={() => setFormData({ ...formData, riskLevel: "High" })} /> <span>High</span></label>
                                <label className="flex items-center space-x-2"><input type="radio" name="risk" className="text-blue-600" checked={formData.riskLevel === "Medium"} onChange={() => setFormData({ ...formData, riskLevel: "Medium" })} /> <span>Medium</span></label>
                                <label className="flex items-center space-x-2"><input type="radio" name="risk" className="text-blue-600" checked={formData.riskLevel === "Low"} onChange={() => setFormData({ ...formData, riskLevel: "Low" })} /> <span>Low</span></label>
                            </div>
                        </div>

                        {/* Attachment */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Attachment <span className="text-red-500">*</span></label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium text-blue-600 hover:text-blue-500">Select files...</span>
                                    <span className="pl-1">or drag and drop files here</span>
                                </div>
                            </div>
                            <p className="mt-2 text-xs text-blue-600 cursor-pointer hover:underline">Click to download "Risk Assessment if not implement" Form</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
                            <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">Submit</button>
                            <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 font-medium">Save Draft</button>
                            <button onClick={handleBack} className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium">Discard</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
