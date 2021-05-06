import Head from "next/head";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { actionTypes } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { parseCookies } from "../helpers/";
import Link from "next/link";
import CalculateFareModal from "../components/Modals/CalculateFareModal";
import useCities from "../hooks/useCities";
import fetchCities from "../functions/fetchCities";

const Deliveries = ({ data }) => {
  const [{ acno }, dispatch] = useStateValue();
  const res = JSON.parse(data.user);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_USER,
      acno: res.acno,
      b_usrId: res.b_usrId,
      name: res.name,
      acc_type: res.type,
    });
  }, []);

  // Modal
  const [show, setShow] = useState(false);

  return (
    <div>
      <Head>
        <title>
          blueEX Booking App - The one stop shop to access all blueEX services
        </title>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <Layout>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="heading">Deliveries</h1>
          <div className="btnGroup">
            <button className="btn" onClick={() => setShow(true)}>
              Calculate Fare
            </button>
            <Link href="/upload-booking">
              <button className="btn">Bulk Import</button>
            </Link>
          </div>
        </div>
      </Layout>
      <CalculateFareModal show={show} onHide={() => setShow(false)} />
    </div>
  );
};

export default Deliveries;

Deliveries.getInitialProps = async ({ req, res }) => {
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
