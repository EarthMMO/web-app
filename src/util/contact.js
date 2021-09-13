const endpoint = `${process.env.NEXT_PUBLIC_AIRTABLE_ENDPOINT}?tableName=${process.env.NEXT_PUBLIC_AIRTABLE_NAME}`;

function submit(data) {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        Name: data.name,
        Email: data.email,
        Message: data.message,
      },
    ]),
  }).then((r) => r.json());
}

const contact = { submit };

export default contact;
