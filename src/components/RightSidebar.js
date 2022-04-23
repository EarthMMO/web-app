import gravatar from "gravatar";
import { PlusSmIcon } from "@heroicons/react/solid";
import { apiRequest } from "utils";
import { useEffect, useState } from "react";

const whoToFollow = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Floyd Miles",
    handle: "floydmiles",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More people...
];

export default function RightSidebar() {
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    async function fetchAttendees() {
      const users = await apiRequest("user/all", "GET");
      setAttendees(users);
      console.log(users);
    }

    fetchAttendees();
  }, []);

  return (
    <aside className="hidden xl:block xl:col-span-3">
      <div className="sticky top-4 space-y-4">
        <section aria-labelledby="who-to-follow-heading">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <span
                id="who-to-follow-heading"
                className="text-base font-medium text-gray-900"
              >
                Attendees
              </span>
              <span className="ml-2 text-base leading-5 text-gray-400">
                ({attendees.length})
              </span>
              <div className="mt-6 flow-root">
                <ul role="list" className="-my-4">
                  {attendees.map((attendee) => (
                    <li
                      key={attendee.userId}
                      className="flex items-center py-2 space-x-3"
                    >
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={gravatar.url(
                            attendee.userId,
                            {
                              d: "identicon",
                              s: "200",
                            },
                            { protocol: "https" }
                          )}
                          alt=""
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          <a href={attendee.href}>
                            {attendee.firstName + " " + attendee.lastName}
                          </a>
                        </p>
                        {/*<p className="text-sm text-gray-500">
                        <a href={user.href}>{"@" + user.handle}</a>
                      </p>*/}
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-0.5 rounded-full bg-green-100 text-sm font-medium text-green-800"
                        >
                          <PlusSmIcon
                            className="-ml-1 mr-0.5 h-5 w-5 text-green-500"
                            aria-hidden="true"
                          />
                          <span>Invite</span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View all
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}
