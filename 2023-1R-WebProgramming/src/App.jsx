import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [row, setRow] = useState([]);
  const [count, setCount] = useState(0);

  //click버튼 과제
  useEffect(() => {
    document.title = `You clicked ${count} times`;

    return () => {
      document.title = "Vite + React";
    };
  }, [count]);

  const onClickButton = () => {
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    console.log("mount or update");

    return () => {
      console.log("unmount");
    };
  });

  //수업시간 실습내용
  useEffect(() => {
    console.log("mount only");
    fetch(
      "http://openapi.seoul.go.kr:8088/636152524f746e7737316d4a437270/json/RealtimeCityAir/1/25/"
    ).then(function (res2) {
      res2.json().then(function (res3) {
        setRow(res3.RealtimeCityAir.row);
      });
    });
  }, []);

  useEffect(() => {
    console.log("update only", row);
  }, [row]);

  // const onClickButton = () => {
  //   if (row.length === 0) {
  //     fetch(
  //       "http://openapi.seoul.go.kr:8088/636152524f746e7737316d4a437270/json/RealtimeCityAir/1/25/"
  //     ).then(function (res2) {
  //       res2.json().then(function (res3) {
  //         setRow(res3.RealtimeCityAir.row);
  //       });
  //     });
  //   }
  // };

  return (
    <>
      {/* <button className="button" onClick={}>
        Loading
      </button> */}
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>PM10</th>
            <th>O3</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {row.map((obj, index) => {
            return (
              <tr key={`row` + index}>
                <td>{obj.MSRSTE_NM}</td>
                <td>{obj.PM10}</td>
                <td>{obj.O3}</td>
                <td>{obj.IDEX_NM}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={onClickButton}> click! count up </button>
    </>
  );
}

export default App;
