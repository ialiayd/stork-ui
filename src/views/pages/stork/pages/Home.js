import React, { useEffect, useRef, useState } from "react"
import Layout from "../components/Layout/Layout"
import Header from "../components/Header/Header"
import TrackingHero from "../components/TrackingHero/TrackingHero"
import { Card, CardBody, CardTitle, CardText, Badge, Button } from "reactstrap"
import moment from "moment"

/*
{
    "data": [
        {
            "trackingId": "48299966772",
            "country": "Turkey"
        },
        {
            "trackingId": "909288523658",
            "country": "Turkey"
        }
    ]
}
*/

const ResultCard = ({ result }) => {
  /*
    {
    "success": true,
    "shipmentTrackingNumber": "48299966772",
    "originCountry": "Khobar",
    "location": "Hofuf",
    "source": "Parcels",
    "deliveryCompany": "Aramex",
    "destinationCountry": "Dhahran, Saudi Arabia",
    "status": "Shipper generated a new shipment label, but the shipment has not been handed over to Aramex, yet. Shipment will be updated once collected from shipper and received in Aramex offices",
    "finalUpdateDate": "2023-04-25T14:41:00Z"
}
  */

  const {
    success,
    deliveryCompany,
    destinationCountry,
    location,
    originCountry,
    shipmentTrackingNumber,
    source,
    status,
    finalUpdateDate,
  } = result

  return (
    <div className="col-12">
      <Card className="card-app-design">
        <CardBody>
          <Badge color={`light-${success ? "success" : "danger"}`}>
            {success ? "Success" : "Failed"}
          </Badge>
          <CardTitle className="mt-1 mb-75">
            {shipmentTrackingNumber} - {deliveryCompany}
          </CardTitle>
          <CardText className="mb-2">{status}</CardText>
          <div className="design-planning-wrapper mb-2 py-75">
            <div className="design-planning">
              <CardText className="mb-25">Origin Country</CardText>
              <h6 className="mb-0">{originCountry}</h6>
            </div>
            <div className="design-planning">
              <CardText className="mb-25">Destination Country</CardText>
              <h6 className="mb-0">{destinationCountry}</h6>
            </div>
            <div className="design-planning">
              <CardText className="mb-25">Location</CardText>
              <h6 className="mb-0">{location}</h6>
            </div>
            <div className="design-planning">
              <CardText className="mb-25">Last Updated</CardText>
              <h6 className="mb-0">
                {moment(finalUpdateDate).utc().format("DD-MM-YYYY")}
              </h6>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function Home() {
  const [results, setResults] = useState([])
  const resultsRef = useRef(null)

  useEffect(() => {
    if (results.length) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" })
      console.log(results)
    }
  }, [results])

  return (
    <Layout>
      <Header>
        <TrackingHero setResults={setResults} />
      </Header>
      {results.length ? (
        <div className="container-xl mt-3" ref={resultsRef}>
          <div className="row">
            {results.map((result, i) => (
              <ResultCard key={i} result={result} />
            ))}
          </div>
        </div>
      ) : null}
    </Layout>
  )
}

export default Home
