import "./Worldcup.css";
import { useEffect, useState } from "react";
import p01 from "./assets/공유.jpeg";
import p02 from "./assets/김선호.jpeg";
import p03 from "./assets/남주혁.jpeg";
import p04 from "./assets/박보검.jpeg";
import p05 from "./assets/박서준.jpeg";
import p06 from "./assets/서강준.jpeg";
import p07 from "./assets/송강.jpeg";
import p08 from "./assets/송중기.jpeg";
import p09 from "./assets/안보현.jpeg";
import p10 from "./assets/안효섭.jpeg";
import p11 from "./assets/이도현.jpeg";
import p12 from "./assets/이동욱.jpeg";
import p13 from "./assets/이수혁.jpeg";
import p14 from "./assets/정해인.jpeg";
import p15 from "./assets/차은우.jpeg";
import p16 from "./assets/현빈.jpeg";

const candidate = [
  { name: "공유", src: p01 },
  { name: "김선호", src: p02 },
  { name: "남주혁", src: p03 },
  { name: "박보검", src: p04 },
  { name: "박서준", src: p05 },
  { name: "서강준", src: p06 },
  { name: "송강", src: p07 },
  { name: "송중기", src: p08 },
  { name: "안보현", src: p09 },
  { name: "안효섭", src: p10 },
  { name: "이도현", src: p11 },
  { name: "이동욱", src: p12 },
  { name: "이수혁", src: p13 },
  { name: "정해인", src: p14 },
  { name: "차은우", src: p15 },
  { name: "현빈", src: p16 },
];

function Worldcup() {
  const [game, setGame] = useState([]);
  const [round, setRound] = useState(0);
  const [nextGame, setNextGame] = useState([]);
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    setGame(
      candidate
        .map((c) => {
          return { name: c.name, src: c.src, order: Math.random() };
        })
        .sort((l, r) => {
          return l.order - r.order;
        })
    );
  }, []);

  useEffect(() => {
    if (game.length > 1 && round + 1 > game.length / 2) {
      setGame(nextGame);
      setNextGame([]);
      setRound(0);
    }
  }, [round]);

  const onClickImage = (index) => {
    setSelectedImage(game[index].src);
    //3초동안 클릭한 이미지 보이고 다음라운드 넘어감
    setTimeout(() => {
      setNextGame((prev) => prev.concat(game[index]));
      setRound((prev) => prev + 1);
      setSelectedImage(null);
    }, 3000);
  };

  if (game.length === 1) {
    return (
      <div>
        <p className="header_title">이상형 월드컵 우승</p>
        <div className="image_winner">
          <img src={game[0].src} className="winner" />
          <p>{game[0].name}</p>
        </div>
      </div>
    );
  }

  if (game.length === 0 || round + 1 > game.length / 2)
    return <p>로딩중입니다.</p>;

  return (
    <div className="wrapper">
      <p className="header_title">
        이상형 월드컵 {round + 1} / {game.length / 2}{" "}
        <b>{game.length === 2 ? "결승" : game.length + "강"}</b>
      </p>

      <div className="image_wrap">
        {selectedImage ? (
          <>
            <div className="image_selected_wrapper">
              <img src={selectedImage} className="image_selected" />
            </div>
          </>
        ) : (
          <>
            <div className="image_box">
              <img
                className="image_left"
                src={game[round * 2].src}
                onClick={() => {
                  onClickImage(round * 2);
                }}
              />
              <div className="image_text_left">
                <p>{game[round * 2].name}</p>
              </div>
            </div>
            <div className="image_box">
              <img
                className="image_right"
                src={game[round * 2 + 1].src}
                onClick={() => {
                  onClickImage(round * 2 + 1);
                }}
              />
              <div className="image_text_right">
                <p>{game[round * 2 + 1].name}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Worldcup;
