import { Card, CardContent } from "@material-ui/core";
import Layout from "../components/Layout";
import Head from "next/head";

const About = () => {
  return (
    <Layout>
      <Head>
        <title>
          blueEX Booking App - The one stop shop to access all blueEX services
        </title>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <div>
        <h1 className="heading">About Us</h1>
        <Card variant="outlined" className="mt-[2rem] p-[2.2rem]">
          <CardContent className="text-sm  text-[#575962]">
            blueEX Booking App is the new app from blueEX that lets you create
            and manage your Cash On Delivery shipments. To see our new list of
            features, please review our Starter Guide. To find out more about
            blueEX visit our website{" "}
            <a
              href="https://www.blue-ex.com"
              target="_blank"
              className="a"
            >
              www.blue-ex.com
            </a>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;

About..getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);

  if (res) {
    if (
      (Object.keys(data).length === 0 && data.constructor === Object) ||
      Object(data).user === "undefined"
    ) {
      res.writeHead(301, { Location: "/" });
      res.end();
    }
  }

  return {
    data: data && data,
  };
};
