import { Card, CardContent } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { CircularProgress } from "@material-ui/core";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";
import { useEffect, useState } from "react";
import fetchShipmentGraph from "../functions/fetchShipmentGraph";
import CurrencyFormat from "react-currency-format";
import PieChart from "./PieChart/PieChart";
import PieChart2 from "./PieChart/PieChart2";
import styles from "../styles/AccountSummary.module.css";

const AccountSummary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [{ acno }, dispatch] = useStateValue();
  const [startDate, setStartDate] = useState("2020/02/01");
  const [endDate, setEndDate] = useState("2021/02/01");
  const [data, setData] = useState(null);

  const fetchGraph = async () => {
    const res = await fetchShipmentGraph(acno, startDate, endDate);
    setData(res);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchGraph();
  }, [startDate, endDate]);

  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);

  return (
    <Card variant="outlined" className="flex-1">
      <CardContent className="border-b p-4 flex items-center justify-between">
        <h2 className="h2">Account Summary</h2>
        <div className="flex items-center space-x-4">
          <span className="text-[#0047ba]">Feb 2 - Mar 3</span>
          <button className="dateBtn">
            <KeyboardArrowDownIcon />
          </button>
        </div>
      </CardContent>
      <CardContent className="flex justify-center flex-col sm:flex-row">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <div className="flex-1">
              <div className="ml-3 text-[#0047ba] border-b">
                <div className="text-3xl font-semibold">
                  <CurrencyFormat
                    renderText={(value) => <>{value}</>}
                    value={data?.booked ?? "0"}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={2}
                  />
                </div>
                <div className="text-sm mt-2 mb-3">Shipments Booked</div>
              </div>
              <div>
                <div className="h-[20rem] w-full">
                  <PieChart
                    name1="Acceptance Shipment"
                    value1={data.accepted}
                    name2="Booked Shipment"
                    value2={data.notarrival}
                    name3="Shipment Ready for Pickup"
                    value3={data.readyforpickup}
                  />
                </div>
                <div className={styles.bars}>
                  <div className={styles.bar}>
                    <div className={styles.val}>{data.accepted}</div>
                    <div className={styles.line}>
                      <div
                        className={styles.linefill}
                        style={{
                          width:
                            (+data.accepted * 100) /
                              (+data.accepted +
                                +data.notarrival +
                                +data.readyforpickup) +
                            "%",
                        }}
                      ></div>
                    </div>
                    <div className={styles.name}>
                      <a href="/" target="_blank">
                        Accepted Shipments
                      </a>
                    </div>
                  </div>
                  <div className={styles.bar}>
                    <div className={styles.val}>{data.notarrival}</div>
                    <div className={styles.line}>
                      <div
                        className={styles.linefill}
                        style={{
                          background: "#00ADEF",
                          width:
                            (+data.notarrival * 100) /
                              (+data.accepted +
                                +data.notarrival +
                                +data.readyforpickup) +
                            "%",
                        }}
                      ></div>
                    </div>
                    <div className={styles.name}>
                      <a href="/" target="_blank">
                        Booked Shipments
                      </a>
                    </div>
                  </div>
                  <div className={styles.bar}>
                    <div className={styles.val}>{data.readyforpickup}</div>
                    <div className={styles.line}>
                      <div
                        className={styles.linefill}
                        style={{
                          background: "#03A596",
                          width:
                            (+data.readyforpickup * 100) /
                              (+data.accepted +
                                +data.notarrival +
                                +data.readyforpickup) +
                            "%",
                        }}
                      ></div>
                    </div>
                    <div className={styles.name}>
                      <a href="/" target="_blank">
                        Shipments Ready for Pickup
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="ml-3 text-[#0047ba] border-b">
                <div className="text-3xl font-semibold">
                  <CurrencyFormat
                    renderText={(value) => <>{value}</>}
                    value={data?.accepted}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={2}
                  />
                </div>
                <div className="text-sm mt-2 mb-3">Shipments Accepted</div>
              </div>
              <div>
                <div className="h-[20rem] w-full">
                  <PieChart2
                    name1="Arrived Shipments"
                    value1={data.arrival}
                    name2="In-Transit Shipments"
                    value2={data.intransit}
                    name3="Delivered Shipments"
                    value3={data.delivered}
                    name4="Returned Shipment"
                    value4={data.returndelivered}
                  />
                </div>
                <div className={styles.bars}>
                  <div className={styles.bar}>
                    <div className={styles.val}>{data.arrival}</div>
                    <div className={styles.line}>
                      <div
                        className={styles.linefill}
                        style={{
                          background: "#7e5e7b",
                          width:
                            (+data.arrival * 100) /
                              (+data.arrival +
                                +data.intransit +
                                +data.delivered +
                                +data.returndelivered) +
                            "%",
                        }}
                      ></div>
                    </div>
                    <div className={styles.name}>
                      <a href="/" target="_blank">
                        Arrived Shipments
                      </a>
                    </div>
                  </div>
                  <div className={styles.bar}>
                    <div className={styles.val}>{data.intransit}</div>
                    <div className={styles.line}>
                      <div
                        className={styles.linefill}
                        style={{
                          background: "#ffc212",
                          width:
                            (+data.intransit * 100) /
                              (+data.arrival +
                                +data.intransit +
                                +data.delivered +
                                +data.returndelivered) +
                            "%",
                        }}
                      ></div>
                    </div>
                    <div className={styles.name}>
                      <a href="/" target="_blank">
                        In-Transit Shipments
                      </a>
                    </div>
                  </div>
                  <div className={styles.bar}>
                    <div className={styles.val}>{data.delivered}</div>
                    <div className={styles.line}>
                      <div
                        className={styles.linefill}
                        style={{
                          background: "#c6d53f",
                          width:
                            (+data.delivered * 100) /
                              (+data.arrival +
                                +data.intransit +
                                +data.delivered +
                                +data.returndelivered) +
                            "%",
                        }}
                      ></div>
                    </div>
                    <div className={styles.name}>
                      <a href="/" target="_blank">
                        Delivered Shipments
                      </a>
                    </div>
                  </div>
                  <div className={styles.bar}>
                    <div className={styles.val}>
                      {data.returndelivered} / {data.return} (
                      {Math.trunc(
                        (+data.returndelivered * 100) / +data.return
                      ) + "%"}
                      ){" "}
                    </div>
                    <div className={styles.line}>
                      <div
                        className={styles.linefill}
                        style={{
                          background: "#ed1f60",
                          width:
                            (+data.returndelivered * 100) /
                              (+data.arrival +
                                +data.intransit +
                                +data.delivered +
                                +data.returndelivered) +
                            "%",
                        }}
                      ></div>
                    </div>
                    <div
                      className={styles.line}
                      style={{ marginTop: "0.2rem" }}
                    >
                      <div
                        className={styles.linefill}
                        style={{
                          background: "#C6D53F",
                          width:
                            (+data.return * 100) /
                              (+data.arrival +
                                +data.intransit +
                                +data.delivered +
                                +data.returndelivered) +
                            "%",
                        }}
                      ></div>
                    </div>
                    <div className={styles.name}>
                      <a href="/" target="_blank">
                        Returns - Delivered / Total
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountSummary;
