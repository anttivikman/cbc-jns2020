import React, { useState, useEffect } from "react";

export default function Corona(props) {
  const [coronaData, setCoronaData] = useState({});

  useEffect(() => {
    const fetchData = () => {
      fetch(
        "https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData"
      )
        .then((response) => response.json())
        .then((data) => setCoronaData(data));
    };
    fetchData();
  }, []);

  console.log(coronaData);
  const counts = ((coronaData || {}).confirmed || []).reduce(
    (result, caseA) => ({
      ...result,
      [caseA.healthCareDistrict]: (result[caseA.healthCareDistrict] || 0) + 1,
    }),
    {}
  );
  console.log(counts);
  return (
    <p style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(counts, null, 2)}</p>
  );
}
