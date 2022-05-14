import TeamTable from "components/TeamTable";

export default function LandingPage() {
  return (
    <main className="col-span-9">
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
        <TeamTable />
      </div>
    </main>
  );
}
