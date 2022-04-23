import Button from "components/Button";
import CreateTeamModal from "components/CreateTeamModal";
import { BACKEND_API_URL } from "config/config";
import { apiRequest } from "utils";
import { useEffect, useState } from "react";

export default function TeamTable() {
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function fetchTeams() {
      const teams = await apiRequest("team/all", "GET");
      setTeams(teams);
      console.log(teams);
    }

    fetchTeams();
  }, []);

  return (
    <>
      <CreateTeamModal
        isModalOpen={isCreateTeamModalOpen}
        setIsModalOpen={setIsCreateTeamModalOpen}
      />
      <div className="mt-8 sm:flex items-center">
        <div className="sm:flex-auto">
          <span className="text-xl font-semibold text-gray-900">Teams</span>
          <span className="ml-2 text-xl leading-5 text-gray-400">
            ({teams.length})
          </span>
        </div>
        <div className="mb-3 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button
            label={"Create team"}
            onClick={() => setIsCreateTeamModalOpen(true)}
          />
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Team
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {teams.map((team) => (
                    <tr key={team.teamId}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={`${BACKEND_API_URL}/uploads/${
                                team.iconPath.split("/")[
                                  team.iconPath.split("/").length - 1
                                ]
                              }`}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {team.name}
                            </div>
                            <div className="text-gray-500">{team.url}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-500 max-w-[200px]">
                          {team.description}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex -space-x-2 overflow-hidden">
                          <img
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                          <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          Recruiting (4/5)
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Button label={"Join instantly"} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
