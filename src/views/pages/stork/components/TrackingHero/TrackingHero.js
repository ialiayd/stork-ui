import React, { useCallback, useEffect, useState } from "react"

import "./TrackingHero.scss"
import { XCircle, ArrowRight } from "react-feather"
import { Row, Col, Container } from "reactstrap"

const TrackingNumber = ({ number, removeNumber }) => {
  return (
    <div className="tracking__number">
      <span>{number}</span>
      <span
        className="tracking__number-button"
        onClick={() => removeNumber(number)}
      >
        <XCircle size={14} className="ms-75" />
      </span>
    </div>
  )
}

const TrackingForm = ({ setResults }) => {
  const [trackingNumbers, setTrackingNumbers] = useState([])
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const removeNumber = (number) => {
    setTrackingNumbers((prev) => prev.filter((n) => n !== number))
  }

  const handleSubmit = useCallback(async () => {
    setResults([])
    setIsLoading(true)
    let trackData = []
    if (!trackingNumbers.length) {
      trackData = value
        .split("\n")
        .filter((n) => n.length > 0)
        .map((n) => n.trim().replace(/[^a-z0-9]/gi, ""))
    } else {
      trackData = trackingNumbers
    }
    setTrackingNumbers([])
    setError("")
    setValue("")
    const res = await fetch("http://127.0.0.1:8080/api/tracks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: trackData.map((number) => ({
          trackingId: number,
        })),
      }),
    })
    const txt = await res.text()
    setResults(JSON.parse(txt))
    setIsLoading(false)
  }, [trackingNumbers, value])

  const handleInputChange = (e) => {
    if (!e.target.value) {
      return
    }
    if (e.key === "Enter") {
      setTrackingNumbers((prev) => {
        const targetAsArray = e.target.value
          .replace(/,/g, "\n")
          .split("\n")
          .filter((n) => n.length > 0)
          .map((n) => n.trim().replace(/[^a-z0-9]/gi, ""))
          .filter((number, _, arr) => {
            if (!prev.includes(number)) {
              return number
            } else {
              if (arr.length === 1) {
                setError("Tracking number already added")
              } else {
                setError("Some tracking numbers already added")
              }
            }
          })
        return [...prev, ...targetAsArray]
      })
      setValue("")
    }
  }

  return (
    <div className="tracking__form">
      <h2 className="tracking__lead">Track Worldwide With 1500+ Carriers!</h2>
      <div>
        <div className="tracking__numbers mb-2">
          {trackingNumbers?.map((number, i) => (
            <TrackingNumber
              key={i}
              number={number}
              removeNumber={removeNumber}
            />
          ))}
        </div>
        <div className="tracking__input-container d-flex">
          <textarea
            type="text"
            rows="1"
            resize="none"
            className="tracking__input"
            placeholder="Add your tracking numbers"
            value={value}
            disabled={isLoading}
            onChange={(e) => {
              setError("")
              setValue(e.target.value)
            }}
            onKeyUp={(e) => handleInputChange(e)}
          />

          <button
            className="tracking__button"
            onClick={() => handleSubmit()}
            disabled={!value && trackingNumbers.length === 0}
          >
            <span>
              <ArrowRight size={30} />
            </span>
            <span>{isLoading ? "Tracking..." : "Track"}</span>
          </button>
        </div>
        {error && <p className="tracking__error">{error}</p>}
      </div>
    </div>
  )
}

function TrackingHero({ setResults }) {
  return (
    <section className="container-md tracking">
      <Row className="mb-2">
        <Col xs="12" xl="12">
          <div className="tracking__content">
            <h1 className="tracking__title">
              <span className="tracking__title-modifier">Track</span> your
              package
            </h1>
            <p className="tracking__subtitle">
              Enter your tracking number to get started
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="12" xs="12" xl="8">
          <TrackingForm setResults={setResults} />
        </Col>
      </Row>
    </section>
  )
}

export default TrackingHero
