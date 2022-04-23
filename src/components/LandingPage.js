import Button from "components/Button";
import CreateTeamModal from "components/CreateTeamModal";
import TeamTable from "components/TeamTable";
import { useState } from "react";

export default function LandingPage() {
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);

  return (
    <main className="col-span-9">
      <CreateTeamModal
        isModalOpen={isCreateTeamModalOpen}
        setIsModalOpen={setIsCreateTeamModalOpen}
      />
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-gray-900">
          ETHAmsterdam Hackathon
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          As part of Devconnect this April, ETHAmsterdam is (finally) bringing
          the community back together. Join over 800 likeminded engineers,
          designers, and creators to build and learn over one full weekend. Meet
          new friends, create something awesome, eat great food, learn from the
          best, meet the people behind your favorite Twitter account.
        </p>
        <div className="mt-8 sm:flex items-center">
          <div className="sm:flex-auto">
            <span className="text-xl font-semibold text-gray-900">Teams</span>
            <span className="ml-2 text-xl leading-5 text-gray-400">(24)</span>
          </div>
          <div className="mb-3 sm:mt-0 sm:ml-16 sm:flex-none">
            <Button
              label={"Create team"}
              onClick={() => setIsCreateTeamModalOpen(true)}
            />
          </div>
        </div>
        <TeamTable />
      </div>
    </main>
  );
}
