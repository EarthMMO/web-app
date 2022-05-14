import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../../components/navbar";

const initalState = {
  currency: "USD",
};

export default function CreateEvent() {
  const [formState, setFormState] = useState(initalState);
  const [preview, setPreview] = useState();
  const [previewNFT, setPreviewNFT] = useState();

  const handleInputChange = (e) => {
    setFormState((state) => ({
      ...state,
      [e.target.name]:
        e.target.files?.length > 0 ? e.target.files[0] : e.target.value,
    }));
  };
  const handleSubmitandMint = (e) => {
    e.preventDefault();
    console.log("submitting formState", formState);
  };
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    const selectedFile = formState.coverFile;
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [formState.coverFile]);

  useEffect(() => {
    const selectedFile = formState.nftFile;
    if (!selectedFile) {
      setPreviewNFT(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewNFT(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [formState.nftFile]);

  return (
    <>
      <Navbar />
      <div className="py-8 max-w-3xl mx-auto sm:px-6 lg:max-w-screen-2xl">
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Event
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Add here all the event info
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmitandMint}>
                <div className="shadow sm:rounded-md sm:overflow-hidden ">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="event-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Event name
                        </label>
                        <input
                          type="text"
                          name="event-name"
                          id="event-name"
                          required
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="event-website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Website
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            http://
                          </span>
                          <input
                            type="text"
                            name="event-website"
                            id="event-website"
                            required
                            onChange={handleInputChange}
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="www.example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          required
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Tell us about your event"
                          defaultValue={""}
                        />
                      </div>
                      {/* <p className="mt-2 text-sm text-gray-500">
                        Brief description for your profile. URLs are
                        hyperlinked.
                      </p> */}
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="min-attendees"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Min number of attendees
                        </label>
                        <input
                          type="number"
                          name="min-attendees"
                          id="min-attendees"
                          onChange={handleInputChange}
                          min={0}
                          placeholder="0"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="max-attendees"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Max number of atendees
                        </label>
                        <input
                          type="number"
                          name="max-attendees"
                          id="max-attendees"
                          required
                          onChange={handleInputChange}
                          min={0}
                          placeholder="100"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="min-team"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Min team size
                        </label>
                        <input
                          type="number"
                          name="min-team"
                          id="min-team"
                          onChange={handleInputChange}
                          min={2}
                          placeholder="0"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="max-team"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Max team size
                        </label>
                        <input
                          type="number"
                          name="max-team"
                          id="max-team"
                          required
                          onChange={handleInputChange}
                          min={7}
                          placeholder="7"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="team-roles"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Team Roles
                        </label>
                        <input
                          type="text"
                          name="team-roles"
                          id="team-roles"
                          //   write other function for this to do some validation
                          onChange={handleInputChange}
                          placeholder="TBD Lead, Backend, Frontend, Devops, QA, etc"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        <p className="mt-2 text-sm text-gray-500">
                          Add roles separated by comma and/or space
                        </p>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="start-date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Event Start Date
                        </label>
                        <input
                          type="datetime-local"
                          name="start-date"
                          id="start-date"
                          required
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="duration"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Duration (in hours)
                        </label>
                        <input
                          type="number"
                          name="duration"
                          id="duration"
                          required
                          onChange={handleInputChange}
                          placeholder="0"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Cover photo
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          {preview ? (
                            <Image
                              src={preview}
                              alt="asdasd"
                              width={48}
                              height={48}
                            />
                          ) : (
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="coverFile"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="coverFile"
                                name="coverFile"
                                required
                                onChange={handleInputChange}
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        required
                        onChange={handleInputChange}
                        placeholder="City, street ..."
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm w-1/2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          required
                          onChange={handleInputChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <label htmlFor="currency" className="sr-only">
                            Currency
                          </label>
                          <select
                            id="currency"
                            name="currency"
                            value={formState.currency}
                            onChange={handleInputChange}
                            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                          >
                            <option>USD</option>
                            <option>USDC</option>
                            <option>EUR</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* separation line */}
                  <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                      <div className="border-t border-gray-200" />
                    </div>
                  </div>
                  {/* NFT data */}
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="w-1/2">
                      <label
                        htmlFor="event-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        NFT name
                      </label>
                      <input
                        type="text"
                        name="event-name"
                        id="event-name"
                        required
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="nft-description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        NFT description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="nft-description"
                          name="nft-description"
                          rows={2}
                          required
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Tell us something about the NFT you will mint"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Upload NFT photo
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          {previewNFT ? (
                            <Image
                              src={previewNFT}
                              alt="asdasd"
                              width={48}
                              height={48}
                            />
                          ) : (
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="nftFile"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="nftFile"
                                name="nftFile"
                                required
                                onChange={handleInputChange}
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create and Mint
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
