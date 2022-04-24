import Button from "components/Button";
import CreateTeamModal from "components/CreateTeamModal";
import gravatar from "gravatar";
import { BACKEND_API_URL } from "config/config";
import { apiRequest } from "utils";
import { useEffect, useState } from "react";

function Team({ initialTeam, user }) {
  const [team, setTeam] = useState(initialTeam);

  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={`${BACKEND_API_URL}/uploads/${
                team.iconPath.split("/")[team.iconPath.split("/").length - 1]
              }`}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{team.name}</div>
            <div className="text-gray-500">{team.url}</div>
          </div>
        </div>
      </td>
      <td className="px-3 py-4 text-sm text-gray-500">
        <div className="text-gray-500 max-w-[200px]">{team.description}</div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div className="flex -space-x-2 overflow-hidden">
          {team.participants.map((member) => (
            <img
              key={team.teamId}
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src={gravatar.url(
                member,
                {
                  d: "identicon",
                  s: "200",
                },
                { protocol: "https" }
              )}
              alt=""
            />
          ))}
          {Array(Math.max(5 - team.participants.length, 0))
            .fill(0)
            .map((_, i) => (
              <span
                key={team.teamId}
                className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100"
              >
                <svg
                  className="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            ))}
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {team.participants.length === 5 ? (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-rose-50 text-sm font-medium text-rose-700 hover:bg-rose-100">
            {`Full (${team.participants.length}/5)`}
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
            {`Open (${team.participants.length}/5)`}
          </span>
        )}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        {team.participants.includes(user?.userId) ? (
          <Button
            customStyles={
              "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-800"
            }
            label={"Leave"}
            onClick={async () => {
              const response = await apiRequest("team/leave", "PATCH", {
                userId: user.userId,
                teamId: team.teamId,
              });
              console.log("LEAVE", response);
              const teamResponse = await apiRequest(
                `team/${team.teamId}`,
                "GET"
              );
              setTeam(teamResponse);
            }}
          />
        ) : team.participants.length === 5 ? (
          <Button
            customStyles={
              "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-400 cursor-not-allowed"
            }
            label={"Team is full"}
          />
        ) : (
          <Button
            label={"Join instantly"}
            onClick={async () => {
              const response = await apiRequest("team", "PATCH", {
                userId: user.userId,
                teamId: team.teamId,
              });
              console.log("JOIN INSTANTLY", response);
              const teamResponse = await apiRequest(
                `team/${team.teamId}`,
                "GET"
              );
              setTeam(teamResponse);
            }}
          />
        )}
      </td>
    </tr>
  );
}

export default function TeamTable() {
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchTeams() {
      const teams = await apiRequest("team/all", "GET");
      setTeams(teams);
      console.log(teams);
    }

    async function fetchCurrentUser() {
      const currentUser = await apiRequest(
        `user/eth/${window.ethereum.selectedAddress}`,
        "GET"
      );
      setUser(currentUser);
    }

    fetchTeams();
    fetchCurrentUser();
  }, []);

  return (
    <>
      <CreateTeamModal
        isModalOpen={isCreateTeamModalOpen}
        setIsModalOpen={setIsCreateTeamModalOpen}
        setTeams={setTeams}
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
                    <Team key={team.teamId} initialTeam={team} user={user} />
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
