import Head from "next/head";
import Layout from "../components/Layout";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";
import { parseCookies } from "../helpers/";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
} from "@material-ui/core";
import useCountries from "../hooks/useCountries";
import useCities from "../hooks/useCities";
import CurrencyFormat from "react-currency-format";
import createShipment from "../functions/createShipment";

const CreateShipment = ({ data }) => {
  const [{ acno }, dispatch] = useStateValue();
  const res = JSON.parse(data.user);

  const [selectedCountry, setSelectedCountry] = useState("PK");
  const [selectedCity, setSelectedCity] = useState("KHI");
  const country = useCountries();
  const city = useCities(selectedCountry);
  const originCity = useCities("PK");

  const [prodValue, setProdValue] = useState("0");
  const [saleDiscount, setSaleDiscount] = useState("");
  const [conName, setConName] = useState("");
  const [conAdd, setConAdd] = useState("");
  const [conCont, setConCont] = useState("");
  const [conMail, setConMail] = useState("");
  const [cbc, setCbc] = useState("Y");
  const [origCity, setOrigCity] = useState("KHI");
  const [destCountry, setDestCountry] = useState("");
  const [destCity, setDestCity] = useState("");
  const [insur, setInsur] = useState("N");
  const [coment, setComent] = useState("");
  const [prodDetail, setProdDetail] = useState("");
  const [serviceCode, setServiceCode] = useState("");
  const [ptype, setPtype] = useState("N");
  const [pcs, setPcs] = useState("");
  const [wgt, setWgt] = useState("");
  const [fragile, setFragile] = useState("N");
  const [custRef, setCustRef] = useState("");
  const [shpName, setShpName] = useState("");
  const [shpAdd, setShpAdd] = useState("");
  const [shpCont, setShpCont] = useState("");
  const [shpMail, setShpMail] = useState("");
  const [storeId, setStoreId] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [insurValue, setInsurValue] = useState("");

  const [status, setStatus] = useState("Save");
  const [message, setMessage] = useState("success");
  const [cnno, setCnno] = useState("5014619681");
  const [validate, setValdate] = useState({
    fullName: false,
    address: true,
    phone: true,
    productName: true,
    pieces: true,
    weight: true,
    productValue: true,
  });

  const [cbcChecked, setCbcChecked] = useState(false);
  const toggleCbc = () => {
    if (cbcChecked) {
      setCbc("N");
    } else {
      setCbc("Y");
    }
    setCbcChecked((prev) => !prev);
  };

  const [fragileChecked, setFragileChecked] = useState(false);
  const toggleFragile = () => {
    if (fragileChecked) {
      setFragileChecked(false);
      setFragile("N");
    } else {
      setFragileChecked(true);
      setFragile("Y");
    }
  };

  const [insurChecked, setInsurChecked] = useState(false);
  const toggleInsur = () => {
    if (insurChecked) {
      setInsurChecked(false);
      setInsur("N");
    } else {
      setInsurChecked(true);
      setInsur("Y");
    }
  };

  const handlePtype = (e) => {
    setPtype(e.target.value);
  };

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_USER,
      acno: res.acno,
      b_usrId: res.b_usrId,
      name: res.name,
      acc_type: res.type,
    });
  }, []);

  const handleShipment = async () => {
    // stat: "Error Please Try Again"
    console.log(`prod Value = ${prodValue}`);
    console.log(`prod Value = ${prodValue}`);
    console.log(
      `http://benefitx.blue-ex.com/api/customerportal/booking_new.php?prod_value=${prodValue}&salediscount=${saleDiscount}&con_name=${conName}&con_add=${conAdd}&con_cont=${conCont}&con_mail=${conMail}&cbc=${cbc}&orig_city=${origCity}&dest_country=${destCountry}&dest_city=${destCity}&insur=${insur}&coment=${coment}&prod_detail=${prodDetail}&service_code=${serviceCode}&ptype=${ptype}&pcs=${pcs}&wgt=${wgt}&fragile=${fragile}&cust_ref=${custRef}&shp_name=${shpName}&shp_add=${shpAdd}&shp_cont=${shpCont}&shp_mail=${shpMail}&storeid=${storeId}&booking_type=${bookingType}&insur_value=${insurValue}&acno=${acno}&status=${status}&message=${message}&cnno=${cnno}`
    );
    console.log(
      await createShipment(
        prodValue,
        saleDiscount,
        conName,
        conAdd,
        conCont,
        conMail,
        cbc,
        origCity,
        destCountry,
        destCity,
        insur,
        coment,
        prodDetail,
        serviceCode,
        ptype,
        pcs,
        wgt,
        fragile,
        custRef,
        shpName,
        shpAdd,
        shpCont,
        shpMail,
        storeId,
        bookingType,
        insurValue,
        acno,
        status,
        message,
        cnno
      )
    );
  };

  return (
    <div>
      <Head>
        <title>
          blueEX Booking App - The one stop shop to access all blueEX services
        </title>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="heading my-4">Create Shipment</h1>
        <div className="flex flex-col xl:flex-row gap-8">
          <div className="flex-1 ">
            <Card variant="outlined">
              <CardContent className="border-b p-4 flex items-center justify-between ">
                <h2 className="h2">Customer Details</h2>
              </CardContent>
              <CardContent className="">
                <div className="row">
                  <label className="label" htmlFor="fullName">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <div className="flex-1 w-full">
                    <input
                      className={`shipmentInput ${
                        validate.fullName ? "nonValid" : "validate"
                      } `}
                      value={conName}
                      onChange={(e) => setConName(e.target.value)}
                      type="text"
                      id="fullName"
                      placeholder="Enter your Full Name"
                    />
                    <div
                      className={`text-red-600 text-xs ${
                        validate.fullName && "hidden"
                      }`}
                    >
                      This field is required.
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="label" htmlFor="address">
                    Address <span className="text-red-600">*</span>
                  </label>
                  <div className="flex-1 w-full">
                    <input
                      className={`shipmentInput ${
                        validate.address ? "nonValid" : "validate"
                      } `}
                      value={conAdd}
                      onChange={(e) => setConAdd(e.target.value)}
                      type="text"
                      id="address"
                      placeholder="Enter your Address"
                    />
                    <div
                      className={`text-red-600 text-xs ${
                        validate.address && "hidden"
                      }`}
                    >
                      This field is required.
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shipmentInput validate"
                    value={conMail}
                    onChange={(e) => setConMail(e.target.value)}
                    type="text"
                    id="email"
                    placeholder="Enter your Email"
                  />
                </div>
                <div className="row">
                  <label className="label" htmlFor="phone">
                    Phone <span className="text-red-600">*</span>
                  </label>
                  <div className="flex-1 w-full">
                    <input
                      className={`shipmentInput ${
                        validate.address ? "validate" : "nonValid"
                      } `}
                      value={conCont}
                      onChange={(e) => setConCont(e.target.value)}
                      type="text"
                      id="phone"
                      placeholder="Enter your Phone"
                    />
                    <div
                      className={`text-red-600 text-xs ${
                        validate.fullName && "hidden"
                      }`}
                    >
                      This field is required.
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="label" htmlFor="country">
                    Destination Country <span className="text-red-600">*</span>
                  </label>

                  <select
                    className="shipmentInput"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    name="country"
                    id="country"
                  >
                    {country &&
                      country.map((c) => (
                        <option value={c.country_code}>{c.country_name}</option>
                      ))}
                  </select>
                </div>
                <div className="row">
                  <label className="label" htmlFor="city">
                    Destination City <span className="text-red-600">*</span>
                  </label>
                  <select
                    className="shipmentInput"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    name="city"
                    id="city"
                  >
                    {city &&
                      city.map((c) => (
                        <option value={c.CITY_CODE}>{c.CITY_NAME}</option>
                      ))}
                  </select>
                </div>
                <div className="row">
                  <label className="label" htmlFor="service">
                    Service <span className="text-red-600">*</span>
                  </label>

                  <select
                    className="shipmentInput"
                    value="BE"
                    onChange={(e) => setServiceCode(e.target.value)}
                    name="service"
                    id="service"
                  >
                    <option value="BE">BLUE EDGE</option>
                  </select>
                </div>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent className="border-b p-4 flex items-center justify-between ">
                <h2 className="h2">Shipper Detail</h2>
              </CardContent>
              <CardContent className="">
                <div className="row">
                  <label className="label" htmlFor="originCity">
                    Origin City <span className="text-red-600">*</span>
                  </label>
                  <select
                    className="shipmentInput"
                    value={origCity}
                    onChange={(e) => setOrigCity(e.target.value)}
                    name="originCity"
                    id="originCity"
                  >
                    {originCity &&
                      originCity.map((c) => (
                        <option value={c.CITY_CODE}>{c.CITY_NAME}</option>
                      ))}
                  </select>
                </div>
                <div className="row">
                  <label className="label" htmlFor="pickup">
                    Pickup Location
                  </label>
                  <select className="shipmentInput" name="pickup" id="pickup">
                    <option value="">Default Pickup Location</option>
                  </select>
                </div>
                <div className="row flex-row-reverse mt-[-2rem]">
                  <button className="bg-[#0047ba] text-white rounded-sm text-xs p-2 ">
                    Add Pickup Location
                  </button>
                </div>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent className="border-b p-4 flex items-center justify-between ">
                <h2 className="h2">Shipment Detail</h2>
              </CardContent>
              <CardContent>
                <div className="row">
                  <label className="label" htmlFor="productName">
                    Product Name <span className="text-red-600">*</span>
                  </label>
                  <div className="flex-1 w-full">
                    <input
                      className="shipmentInput"
                      type="text"
                      id="productName"
                      placeholder="Blue T-shirt"
                      value={prodDetail}
                      onChange={(e) => setProdDetail(e.target.value)}
                    />
                    <div className="text-red-600 text-xs hidden">
                      This field is required.
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="label" htmlFor="pieces">
                    Pieces <span className="text-red-600">*</span>
                  </label>
                  <div className="flex-1 w-full">
                    <input
                      className="shipmentInput"
                      type="number"
                      id="pieces"
                      placeholder="1"
                      value={pcs}
                      onChange={(e) => setPcs(e.target.value)}
                    />
                    <div className="text-red-600 text-xs hidden">
                      This field is required.
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="label" htmlFor="weight">
                    Weight (KG) <span className="text-red-600">*</span>
                  </label>
                  <div className="flex-1 w-full">
                    <input
                      className="shipmentInput"
                      type="number"
                      id="weight"
                      placeholder="0.5"
                      value={wgt}
                      onChange={(e) => setWgt(e.target.value)}
                    />
                    <div className="text-red-600 text-xs hidden">
                      This field is required.
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="label" htmlFor=""></label>
                  <p className="flex-1 text-xs text-gray-600">
                    NOTE: This is not the final weight. Subject to the
                    confirmation at Blue-Ex Operations.
                  </p>
                </div>
                <div className="row">
                  <label className="label" htmlFor="value">
                    Product Value (Rs.) <span className="text-red-600">*</span>
                  </label>
                  <div className="flex-1 w-full">
                    <input
                      className="shipmentInput"
                      value={prodValue}
                      onChange={(e) => setProdValue(e.target.value)}
                      type="number"
                      id="value"
                      placeholder="1500"
                    />
                    <div className="text-red-600 text-xs hidden">
                      This field is required.
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="label" htmlFor="ref">
                    Product Ref
                  </label>
                  <input
                    className="shipmentInput"
                    value={custRef}
                    onChange={(e) => setCustRef(e.target.value)}
                    type="text"
                    id="ref"
                    placeholder="S-90091"
                  />
                </div>
                <div className="row">
                  <label className="label" htmlFor="service">
                    Remarks{" "}
                  </label>
                  <textarea
                    style={{ resize: "none" }}
                    className="shipmentInput"
                    name="service"
                    id="service"
                    cols="30"
                    rows="3"
                    placeholder="This is exchange product, size Medium"
                    value={coment}
                    onChange={(e) => setComent(e.target.value)}
                  ></textarea>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="xl:min-w-[20rem]">
            <Card variant="outlined">
              <CardContent className="border-b p-4 flex items-center justify-between ">
                <h2 className="h2">Shipment Options</h2>
              </CardContent>
              <CardContent className="border-b border-dashed p-4 flex flex-col ">
                <div className="">Services *</div>
                <div className="bg-[#0047ba] text-white text-sm w-[4.5rem] mt-2 p-2 rounded-full flex justify-center items-center">
                  COD
                </div>
              </CardContent>
              <CardContent className="border-b border-dashed p-4 flex flex-col ">
                <div className="">
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="document"
                      name="document"
                      value={ptype}
                      onChange={handlePtype}
                    >
                      <FormControlLabel
                        value="D"
                        control={<Radio color="primary" />}
                        label="Document"
                      />
                      <FormControlLabel
                        value="N"
                        control={<Radio color="primary" />}
                        label="Parcel"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Cash Collection</div>
                    <div className="">
                      <Switch
                        checked={cbcChecked}
                        onClick={toggleCbc}
                        color="primary"
                        name="cbc"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </div>
                  </div>
                  {cbcChecked && (
                    <p className="w-[15rem] text-red-600 text-xs my-4">
                      Product Value can not be Rs. if Cash Collection is turned
                      on.
                    </p>
                  )}
                </div>
                <div className="">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Fragile</div>
                    <div className="">
                      <Switch
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        checked={fragileChecked}
                        onClick={toggleFragile}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Insurance</div>
                    <div className="">
                      <Switch
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        checked={insurChecked}
                        onClick={toggleInsur}
                      />
                    </div>
                  </div>
                  {insurChecked && (
                    <input
                      className="shipmentInput"
                      type="text"
                      value={insurValue}
                      onChange={(e) => setInsurValue(e.target.value)}
                      placeholder="Insurance Value"
                    />
                  )}
                </div>
              </CardContent>
              <CardContent className="flex justify-between items-center p-4 my-4">
                <div className="font-semibold">Cash Collection</div>
                <div className="">
                  <CurrencyFormat
                    renderText={(value) => <>{value}</>}
                    value={prodValue}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={2}
                    prefix={"Rs. "}
                  />
                </div>
              </CardContent>
            </Card>
            <button
              onClick={handleShipment}
              className="bg-[#0047ba] w-full text-white p-2 mt-[2rem] rounded-sm"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CreateShipment;

CreateShipment.getInitialProps = async ({ req, res }) => {
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
