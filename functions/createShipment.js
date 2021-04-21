var myHeaders = new Headers();
myHeaders.append("Cookie", "PHPSESSID=bavlsqfreb30l7ahhib1ls9uf6");

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  redirect: "follow",
};

const createShipment = async (
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
) => {
  let data;

  await fetch(
    `http://benefitx.blue-ex.com/api/customerportal/booking_new.php?prod_value=${prodValue}&salediscount=${saleDiscount}&con_name=${conName}&con_add=${conAdd}&con_cont=${conCont}&con_mail=${conMail}&cbc=${cbc}&orig_city=${origCity}&dest_country=${destCountry}&dest_city=${destCity}&insur=${insur}&coment=${coment}&prod_detail=${prodDetail}&service_code=${serviceCode}&ptype=${ptype}&pcs=${pcs}&wgt=${wgt}&fragile=${fragile}&cust_ref=${custRef}&shp_name=${shpName}&shp_add=${shpAdd}&shp_cont=${shpCont}&shp_mail=${shpMail}&storeid=${storeId}&booking_type=${bookingType}&insur_value=${insurValue}&acno=${acno}&status=${status}&message=${message}&cnno=${cnno}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => (data = result.record[0]))
    .catch((error) => console.log("error", error));

  return data;
};

export default createShipment;
