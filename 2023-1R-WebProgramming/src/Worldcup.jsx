import './Worldcup.css';
import { useEffect, useState } from 'react';
import p01 from './assets/공유.jpeg';
import p02 from './assets/김선호.jpeg';
import p03 from './assets/남주혁.jpeg';
import p04 from './assets/박보검.jpeg';
import p05 from './assets/박서준.jpeg';
import p06 from './assets/서강준.jpeg';
import p07 from './assets/송강.jpeg';
import p08 from './assets/송중기.jpeg';
import p09 from './assets/안보현.jpeg';
import p10 from './assets/안효섭.jpeg';
import p11 from './assets/이도현.jpeg';
import p12 from './assets/이동욱.jpeg';
import p13 from './assets/이수혁.jpeg';
import p14 from './assets/정해인.jpeg';
import p15 from './assets/차은우.jpeg';
import p16 from './assets/현빈.jpeg';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const candidate = [
  { name: '공유', src: p01 },
  { name: '김선호', src: p02 },
  { name: '남주혁', src: p03 },
  { name: '박보검', src: p04 },
  { name: '박서준', src: p05 },
  { name: '서강준', src: p06 },
  { name: '송강', src: p07 },
  { name: '송중기', src: p08 },
  { name: '안보현', src: p09 },
  { name: '안효섭', src: p10 },
  { name: '이도현', src: p11 },
  { name: '이동욱', src: p12 },
  { name: '이수혁', src: p13 },
  { name: '정해인', src: p14 },
  { name: '차은우', src: p15 },
  { name: '현빈', src: p16 },
];

function Worldcup() {
  const [game, setGame] = useState([]);
  const [round, setRound] = useState(0);
  const [nextGame, setNextGame] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  //통계정보 저장하는 state
  const [stat, setStat] = useState({
    공유: 0,
    김선호: 0,
    남주혁: 0,
    박보검: 0,
    박서준: 0,
    서강준: 0,
    송강: 0,
    송중기: 0,
    안보현: 0,
    안효섭: 0,
    이도현: 0,
    이동욱: 0,
    이수혁: 0,
    정해인: 0,
    차은우: 0,
    현빈: 0,
  });

  useEffect(() => {
    const localStorageData = localStorage.getItem('2019111615');
    if (localStorageData != null) {
      setStat(JSON.parse(localStorageData));
    }
    setGame(
      candidate
        .map((c) => ({ ...c, order: Math.random() }))
        .sort((l, r) => l.order - r.order)
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
    });
  };

  const left = round * 2;
  const right = round * 2 + 1;

  const leftFunction = () => {
    onClickImage(left);
    setStat({
      ...stat,
      [game[left].name]: stat[game[left].name] + 1,
    });
  };
  const rightFunction = () => {
    onClickImage(right);
    setStat({
      ...stat,
      [game[right].name]: stat[game[right].name] + 1,
    });
  };

  //통계 chart.js
  const dataName = Object.keys(JSON.parse(localStorage.getItem('2019111615')));
  const dataCount = Object.values(
    JSON.parse(localStorage.getItem('2019111615'))
  );
  const data = {
    labels: dataName,
    datasets: [
      {
        label: '이상형 월드컵 통계',
        data: dataCount,
        borderWidth: 1,
      },
    ],
  };
  if (game.length === 1) {
    localStorage.setItem('2019111615', JSON.stringify(stat));
    return (
      <>
        <div>
          <p className='header_title'>이상형 월드컵 우승</p>
          <div className='image_winner'>
            <img src={game[0].src} className='winner' />
            <p>{game[0].name}</p>
            <p>{stat[game[0].name]}번 승리</p>
          </div>
          {/* <table>
            {Object.keys(stat).map((name) => {
              return (
                <tr key={name}>
                <td>{name}</td>
                <td>{stat[name]}</td>
                </tr>
                );
              })}
            </table> */}
        </div>
        <div>
          <Bar type='bar' data={data} />
        </div>
      </>
    );
  }

  if (game.length === 0 || round + 1 > game.length / 2) {
    return <p>로딩중입니다.</p>;
  }

  return (
    <div className='wrapper'>
      <p className='header_title'>
        이상형 월드컵 {round + 1} / {game.length / 2}{' '}
        <b>{game.length === 2 ? '결승' : game.length + '강'}</b>
      </p>

      <div className='image_wrap'>
        {selectedImage ? (
          <>
            <div className='image_selected_wrapper'>
              <img src={selectedImage} className='image_selected' />
            </div>
          </>
        ) : (
          <>
            <div className='image_box'>
              <img
                className='image_left'
                src={game[left].src}
                onClick={leftFunction}
              />
              <div className='image_text left'>
                <p>{game[round * 2].name}</p>
              </div>
            </div>
            <div className='image_box'>
              <img
                className='image_right'
                src={game[right].src}
                onClick={rightFunction}
              />
              <div className='image_text right'>
                <p>{game[right].name}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Worldcup;
