import BaseModal from "components/BaseModal";
import { ClipLoader } from "react-spinners";
import { Dialog } from "@headlessui/react";
import { apiRequest } from "utils";
import { useEffect, useRef, useState } from "react";

export default function FirstTimeModal({
  isFirstTimeModalOpen,
  isModalOpen,
  setIsFirstTimeModalOpen,
  setIsModalOpen,
  //setUser,
}) {
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const [createTeamLoading, setCreateTeamLoading] = useState(false);
  const [teamDescription, setTeamDescription] = useState("");
  const [teamImage, setTeamImage] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [teamUrl, setTeamUrl] = useState("");
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   async function fetchCurrentUser() {
  //     const currentUser = await apiRequest(
  //       `user/eth/${window.ethereum.selectedAddress}`,
  //       "GET"
  //     );
  //     setUser(currentUser);
  //   }

  //   fetchCurrentUser();
  // }, []);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
        setTeamImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateTeamLoading(true);
    const response = await apiRequest("team", "POST", {
      adminUserId: user.userId,
      description: teamDescription,
      name: teamName,
      icon: teamImage,
      totalNumberOfPeople: 5, // TODO: hard-coded
      url: teamUrl,
    });
    const teams = await apiRequest("team/all", "GET");
    setTeams(teams);
    setCreateTeamLoading(false);
    setIsModalOpen(false);
  };

  return (
    <BaseModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="mt-3 text-center sm:mt-5">
        <Dialog.Title>
          <h2 className="my-6 text-center text-4xl font-philosopher font-extrabold text-gray-900">
            Create team
          </h2>
        </Dialog.Title>
      </div>
      <form action="#" method="POST">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Team name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="team-name"
                  id="team-name"
                  autoComplete="team-name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-span-3 sm:col-span-2">
              <label
                htmlFor="team-url"
                className="block text-sm font-medium text-gray-700"
              >
                Team URL
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  https://
                </span>
                <input
                  type="text"
                  name="team-url"
                  id="team-url"
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  placeholder="www.example.com"
                  onChange={(e) => setTeamUrl(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Describe your team's project"
                defaultValue={""}
                onChange={(e) => setTeamDescription(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Team Profile Image
            </label>
            <div className="mt-3 flex items-center">
              <div
                style={{
                  height: "60px",
                  width: "60px",
                  border: "1px dashed black",
                }}
                onClick={() => imageUploader.current.click()}
              >
                <img
                  ref={uploadedImage}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <button
                type="button"
                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => imageUploader.current.click()}
              >
                Change
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                  display: "none",
                }}
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 text-right sm:px-6">
          <button
            onClick={handleSubmit}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {createTeamLoading ? (
              <ClipLoader color={"#fff"} size={18} />
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
