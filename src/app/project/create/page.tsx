/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import axios, { AxiosError } from 'axios';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { CrafterI } from '@/interfaces/crafter.interfaces';

import { FaPlusSquare } from '@react-icons/all-files/fa/FaPlusSquare';
import Select from 'react-select/async';
import { useAppSelector } from '@/lib/store';
import { SingleValue } from 'react-select';
import { SortType } from '@/app/api/product/getProduct';
import { router } from 'next/client';
import { Cut, Draw, Embroidery, Laser, materialUsed, Print, trashBtn } from '~/images';
import NextImage from '@/components/NextImage';
import { FaTrash } from 'react-icons/fa';

export interface StarSummary {
  average: number
  one: number
  two: number
  three: number
  four: number
  five: number
}

interface Step {
  stepsNumber?: number;
  image: FileList | null;
  description: string;
}

enum OperationType {
  Cut = "Cut",
  Draw = "Draw",
  Print = "Print",
  CutnDraw = "CutnDraw",
  Engrave = "Engrave",
  Embroidery = "Embroidery",
}

const operationTypes = [
  { value: OperationType.Cut, label: "Cut" },
  { value: OperationType.Draw, label: "Draw" },
  { value: OperationType.Print, label: "Print" },
  { value: OperationType.CutnDraw, label: "Cut & Draw" },
  { value: OperationType.Engrave, label: "Engrave" },
  { value: OperationType.Embroidery, label: "Embroidery" },
];

enum MaterialType {
  Paper = "Paper",
  Cardstock = "Cardstock",
  Vinyl = "Vinyl",
  Wood = "Wood",
  Acrylic = "Acrylic",
  Acetate = "Acetate",
  PaperMotif = "PaperMotif",
  Chipboard = "Chipboard",
  CrepePaper = "CrepePaper",
  FauxLeather = "FakeLeather",
}

const materialTypes = [
  { value: MaterialType.Paper, label: "Paper" },
  { value: MaterialType.Cardstock, label: "Cardstock" },
  { value: MaterialType.Vinyl, label: "Vinyl" },
  { value: MaterialType.Wood, label: "Wood" },
  { value: MaterialType.Acrylic, label: "Acrylic" },
  { value: MaterialType.Acetate, label: "Acetate" },
  { value: MaterialType.PaperMotif, label: "Paper Motif" },
  { value: MaterialType.Chipboard, label: "Chipboard" },
  { value: MaterialType.CrepePaper, label: "Crepe Paper" },
  { value: MaterialType.FauxLeather, label: "Faux Leather" },
];

const generateOperationImage = (operation: OperationType): string[] => {
  switch (operation) {
    case OperationType.Cut:
      return [Cut];
    case OperationType.Draw:
      return [Draw];
    case OperationType.Print:
      return [Print];
    case OperationType.CutnDraw:
      return [Cut, Draw];
    case OperationType.Embroidery:
      return [Embroidery]; // Assuming Draw is used for Embroidery as well
    default:
      return [Laser];
  }
};

const levels = ["Beginner", "Intermediate", "Professional"];

export default function Register() {
  const { token } = useAppSelector(state => state.user);
  const router = useRouter();
  const [image, setImage] = useState<FileList>();
  const [products, setProducts] = useState<SingleValue<{
    label: string;
    value: string;
  }>[]>([]);
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('0');

  const getProducts = async (search: string) => {
    try {
      if (search.includes('#')) {
        const searchDecoded = search.replace("#", '');
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/dump/free`, {
          params: {
            page: 1,
            limit: 10,
            search: searchDecoded,
            isFavorite: "All",
            sortType: "Latest",
          }
        });
        return res.data.data.map((item: any) => ({
          value: `#${item.id}`,
          label: item.title,
        }));
      } else {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product`, {
          params: {
            page: 1,
            limit: 10,
            search,
            sortType: SortType.Latest
          }
        });
        return res.data.data.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));
      }
    } catch (error) {
      return [];
    }
  }

  const loadOptions = (inputValue: string) =>
    new Promise<{ label: string, value: string }[]>((resolve) => {
      resolve(getProducts(inputValue));
    });

  const handleSubmit = async () => {
    try {
      // console.log("Mulai submit...");
      // Upload image utama
      const bodyFormData = new FormData();
      bodyFormData.append("file", image![0]);
      bodyFormData.append("type", "OTHER_URL");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDIA_URL}/image`,
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
          body: bodyFormData,
        }
      );

      const imgResponse = await response.json();
      // console.log("Main image upload response:", imgResponse);

      if (!imgResponse?.data?.filename) {
        throw new Error("Main image upload failed: filename not found");
      }

      const imageUrl = imgResponse.data.filename;

      // Upload image setiap step
      const stepImageUrls: string[] = [];
      for (let i = 0; i < steps.length; i++) {
        const stepImage = steps[i].image;
        if (!stepImage || stepImage.length === 0) {
          console.warn(`Step ${i + 1} belum memilih file, dilewati.`);
          continue; // skip step tanpa file
        }

        const stepFormData = new FormData();
        // Cast ke File supaya TS yakin
        stepFormData.append("file", stepImage[0] as File);
        stepFormData.append("type", "OTHER_URL");

        try {
          const stepRes = await fetch(`${process.env.NEXT_PUBLIC_MEDIA_URL}/image`, {
            method: "POST",
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
            body: stepFormData,
          });

          const stepJson = await stepRes.json();
          // console.log(`Step ${i + 1} image upload response:`, stepJson);

          const imageUrl = stepJson.data?.filename;
          if (imageUrl) {
            stepImageUrls.push(imageUrl);
          } else {
            console.warn(`Step ${i + 1} tidak dapat imageUrl`);
          }
        } catch (err) {
          console.error(`Error upload step ${i + 1}:`, err);
        }
      }

      // console.log("Semua step images:", stepImageUrls);

      // Kirim data project + step
      const payload = {
        description,
        imageUrl,
        productIds: products.map((item) => item?.value),
        operation: selectedOperations,
        material: selectedMaterials,
        time: parseInt(time),
        difficulty: selectedDiff,
        steps: steps.map((step, idx) => ({
          stepsNumber: step.stepsNumber,
          description: step.description,
          imageUrl: stepImageUrls[idx],
        })),
      };

      // console.log("Final payload yang akan dikirim:", payload);

      const createRes = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/crafter`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log("API create crafter response:", createRes.data);

      // toast.success("Upload Project Success (tanpa redirect)");
      window.location.href = "/project?upload=success";
    } catch (error: any) {
      console.error("Error in handleSubmit:", error);
      toast.error(error.message || "Upload Project Failed");
    }
  };


  const [selectedOperations, setSelectedOperations] = useState<OperationType[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<MaterialType[]>([]);

  const toggleOperation = (value: OperationType) => {
    setSelectedOperations((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleMaterial = (value: MaterialType) => {
    setSelectedMaterials((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const [selectedDiff, setSelectedDiff] = useState("Beginner");

  const [steps, setSteps] = useState<Step[]>([
    // { stepNumber: 1, image: null, description: "" },
  ]);

  const handleAddStep = () => {
    setSteps([...steps, {stepsNumber: steps.length + 1, image: null, description: "" }]);
  };

  const handleDeleteStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  const handleImageChange = (index: number, files: FileList | null) => {
    if (!files) return;

    const file = files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (file.size > maxSize) {
      toast.error(`File "${file.name}" is too large! Max 2MB.`);
      return;
    }

    const newSteps = [...steps];
    newSteps[index].image = files; // sekarang kompatibel
    setSteps(newSteps);
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index].description = value;
    setSteps(newSteps);
  };

  return (
    <>
      <main>
        <div>
            <div className='rounded-3xl bg-white shadow-lg '>
              <div className='flex flex-col items-center justify-center gap-10 rounded-t-3xl px-8 lg:px-40 py-8'>
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl w-full">
                  <h2 className="mb-4 text-lg font-semibold text-[#1A214C]">
                    Upload Image Project Result
                  </h2>
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 w-full p-4">
                      {image ?
                          <label htmlFor='chooseImage' className="flex aspect-[3/2] w-full items-center justify-center rounded-xl bg-gray-100 p-4 h-full">
                            <img alt='project image' src={URL.createObjectURL(image[0])} className='w-full h-full object-cover' />
                          </label>
                          :
                          <label htmlFor='chooseImage' className="flex aspect-[3/2] w-full items-center justify-center rounded-xl bg-gray-100 p-4 h-full">
                            <div className='flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-400 border-opacity-25 px-8'>
                              <FaPlusSquare className='text-gray-300' size={70} />
                              <p className='text-sm text-gray-300'>
                                Upload Image Project Result
                              </p>
                            </div>
                          </label>
                      }
                      <input
                        type='file'
                        className='hidden'
                        id='chooseImage'
                        accept='image/*'
                        onChange={(e) => {
                          if (e.target.files) {
                            const file = e.target.files[0];
                            const maxSize = 2 * 1024 * 1024; // 2MB dalam byte

                            if (file.size > maxSize) {
                              toast.error("File is too large! Max 2MB.");
                              e.target.value = ""; // reset input biar gak nyangkut
                              return;
                            }

                            setImage(e.target.files); // kalau oke, simpan ke state
                          }
                        }}
                      />
                    </div>
                    <div className="lg:w-1/2 w-full flex flex-col justify-between p-4">
                      <p className='text-sm font-katide-regular text-[#61657D] mb-10'>
                        Upload images to fully showcase what you've created.
                      </p>
                      <div className='mt-auto'>
                        <p className='text-sm font-katide-regular text-[#61657D80]'>
                          Suggest upload ratio 3:2
                        </p>
                        <p className='text-sm font-katide-regular text-[#61657D80]'>
                          Max size 2MB
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl w-full">
                  <h2 className="mb-4 text-lg font-semibold text-[#1A214C]">
                    The product file you're using
                  </h2>

                  {/* Product 1 */}
                  <div className="mb-4">
                    <label className="mb-1 block text-sm font-semibold text-[#1A214C]">
                      Search product 1
                    </label>
                    <Select
                      cacheOptions
                      loadOptions={loadOptions}
                      defaultOptions
                      onChange={(e) => setProducts(prev => [...prev, e])}
                    />
                  </div>

                  {/* Product 2 */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <label className="mb-1 block text-sm font-semibold text-[#1A214C]">
                        Search product 2
                      </label>
                    </div>
                    <Select
                      cacheOptions
                      loadOptions={loadOptions}
                      defaultOptions
                      onChange={(e) => setProducts(prev => [...prev, e])}
                    />
                  </div>

                  {/* Product 3 */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="mb-1 block text-sm font-semibold text-[#1A214C]">
                        Search product 3
                      </label>
                    </div>
                    <Select
                      cacheOptions
                      loadOptions={loadOptions}
                      defaultOptions
                      onChange={(e) => setProducts(prev => [...prev, e])}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl w-full">
                  <h2 className="mb-4 text-lg font-semibold text-[#1A214C]">
                    Basic Information
                  </h2>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="my-2 h-[150px] w-full rounded-lg border border-gray-300 bg-gray-100 p-4 placeholder:text-gray-300"
                    placeholder="Add description here"
                    required
                  ></textarea>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl w-full">
                  <h2 className="mb-4 text-lg font-semibold text-[#1A214C]">
                    Instruction
                  </h2>

                  {steps.map((step, index) => (
                    <div key={index} className="rounded-2xl border border-gray-200 bg-white p-4 w-full mb-4">
                      <h2 className="flex mb-4 text-lg font-semibold text-[#1A214C]">
                        <p>Step {index + 1}</p>
                        {index === steps.length - 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteStep(index)}
                            className="text-red-500 hover:text-red-700 ms-2 p-1 rounded-full"
                          >
                            <NextImage
                              src={trashBtn}
                              alt="Operation Type"
                              width={20}
                              height={20}
                            />
                          </button>
                        )}
                      </h2>
                      <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 w-full">
                          {step.image ? (
                            <label
                              htmlFor={`chooseImage-${index}`}
                              className="flex aspect-[3/2] w-full items-center justify-center rounded-xl bg-gray-100 p-4 h-full"
                            >
                              <img
                                alt="project image"
                                src={URL.createObjectURL(step.image[0])}
                                className="w-full h-full object-cover"
                              />
                            </label>
                          ) : (
                            <label
                              htmlFor={`chooseImage-${index}`}
                              className="flex aspect-[3/2] w-full items-center justify-center rounded-xl bg-gray-100 p-4 h-full"
                            >
                              <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-400 border-opacity-25 px-8">
                                <FaPlusSquare className="text-gray-300" size={70} />
                                <p className="text-sm text-gray-300">
                                  Upload Image Project Result
                                </p>
                              </div>
                            </label>
                          )}
                          <input
                            type="file"
                            className="hidden"
                            id={`chooseImage-${index}`}
                            accept="image/*"
                            onChange={(e) => handleImageChange(index, e.target.files)}
                          />
                        </div>

                        <div className="lg:w-1/2 w-full flex flex-col justify-between p-4">
                          <p className="text-sm font-katide-regular text-[#61657D] mb-10">
                            Upload images to fully showcase what you've created.
                          </p>
                          <div className="mt-auto">
                            <p className="text-sm font-katide-regular text-[#61657D80]">
                              Suggest upload ratio 3:2
                            </p>
                            <p className="text-sm font-katide-regular text-[#61657D80]">
                              Max size 2MB
                            </p>
                          </div>
                        </div>
                      </div>

                      <textarea
                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                        value={step.description}
                        className="my-4 h-[150px] w-full rounded-lg border border-gray-300 bg-gray-100 p-4 placeholder:text-gray-300"
                        placeholder="Add description here"
                        required
                      ></textarea>
                    </div>
                  ))}
                  <div className='flex items-center justify-center w-full'>
                    <button
                      type="button"
                      onClick={handleAddStep}
                      className="flex w-auto items-center justify-center gap-3 rounded-xl px-6 py-3 mt-4 font-semibold border border-gray-300 hover:bg-gray-100 text-[#1A214C]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      Add Step
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl w-full">
                  <h2 className="mb-4 text-lg font-semibold text-[#1A214C]">
                    Production
                  </h2>
                  <div className='col-span-2 flex flex-col mt-4 mb-4 w-full border-t border-[#1A214C]/15' />
                  <div className='px-2'>
                    <h2 className="mb-2 text-sm font-semibold text-[#1A214C]">
                      Operation
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {operationTypes.map((op) => {
                        const icons = generateOperationImage(op.value);

                        return (
                          <label
                            key={op.value}
                            className={`flex items-center gap-1 cursor-pointer me-3 ${
                              selectedOperations.includes(op.value) ? "text-gray-700" : "text-gray-400"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedOperations.includes(op.value)}
                              onChange={() => toggleOperation(op.value)}
                              className="accent-indigo-500 rounded-sm"
                            />

                            {/* Render semua icon dari array */}
                            {icons.map((src, idx) => (
                              <NextImage
                                key={idx}
                                src={src}
                                alt={op.label}
                                width={15}
                                height={15}
                              />
                            ))}

                            <span className="text-sm">{op.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <div className='col-span-2 flex flex-col mt-5 mb-4 w-full border-t border-[#1A214C]/15' />
                  <div className='px-2'>
                    <h2 className="mb-2 text-sm font-semibold text-[#1A214C]">
                      Material Used
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {materialTypes.map((op) => {
                        return (
                          <label
                            key={op.value}
                            className={`flex items-center gap-1 cursor-pointer me-3 ${
                              selectedMaterials.includes(op.value) ? "text-gray-700" : "text-gray-400"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedMaterials.includes(op.value)}
                              onChange={() => toggleMaterial(op.value)}
                              className="accent-indigo-500 rounded-sm"
                            />
                            <span className="text-sm">{op.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <div className='col-span-2 flex flex-col mt-5 mb-4 w-full border-t border-[#1A214C]/15' />
                  <div className='px-2'>
                    <h2 className="mb-2 text-sm font-semibold text-[#1A214C]">
                      Difficulty Level
                    </h2>
                    <div className="flex flex-wrap items-center gap-3">
                      {levels.map((level) => (
                        <button
                          key={level}
                          onClick={() => setSelectedDiff(level)}
                          className={`px-4 py-2 rounded-md text-gray-700 font-medium
                            ${
                              selectedDiff === level
                                ? "bg-gray-400 text-gray-900"
                                : "bg-gray-200 hover:bg-gray-300"
                            }
                          `}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className='col-span-2 flex flex-col mt-5 mb-4 w-full border-t border-[#1A214C]/15' />
                  <div className='px-2'>
                    <h2 className="mb-2 text-sm font-semibold text-[#1A214C]">
                      Total Time (Minutes)
                    </h2>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                        min={0}
                        className="w-32 rounded-lg border border-gray-300 bg-gray-100 p-2 placeholder:text-gray-300"
                        placeholder="e.g., 60"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className='flex w-full items-center justify-center gap-2 rounded-2xl bg-[#008ECC] hover:bg-[#4065D1] px-6 py-3 font-semibold text-white'
                >
                  Upload
                </button>
              </div>
            </div>
        </div>
      </main>
    </>
  );
}
