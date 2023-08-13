export default async function handler(req, res) {
  const { npub } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const response = await fetch(
          `https://www.nostrstuff.com/api/users/${npub}`,
        );
        const content = JSON.parse((await response.json()).content);

        if (response.ok) {
          res.status(response.status).json(content);
        } else {
          res.status(response.status).end(`Error: ${response.statusText}`);
        }
      } catch (error) {
        console.log(error);
        res.status(500).end("Something went wrong :(");
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
