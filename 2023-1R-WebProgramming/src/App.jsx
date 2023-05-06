import { useState } from "react";
import "./App.css";

function App() {
  const [row, setRow] = useState([]);

  const onClickButton = () => {
    if (row.length === 0) {
      fetch(
        "http://openapi.seoul.go.kr:8088/636152524f746e7737316d4a437270/json/RealtimeCityAir/1/25/"
      ).then(function (res2) {
        res2.json().then(function (res3) {
          setRow(res3.RealtimeCityAir.row);
        });
      });
    }
  };

  return (
    <>
      <button className="button" onClick={onClickButton}>
        Loading
      </button>
      <table>
        <thead>
          <th>이름</th>
          <th>PM10</th>
          <th>O3</th>
          <th>상태</th>
        </thead>
        <tbody>
          {row.map((obj, index) => {
            return (
              <tr key={index}>
                <td>{obj.MSRSTE_NM}</td>
                <td>{obj.PM10}</td>
                <td>{obj.O3}</td>
                <td>{obj.IDEX_NM}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
