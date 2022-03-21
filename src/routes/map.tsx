import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  position: fixed;
  z-index: 999;
  background-color: ${(props) => props.theme.bgColor};
  height: 60px;
  width: 100%;
  min-width: 1080px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.24);
`;
const Navigation = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.div`
  margin: 0 37px;
  font-size: 25px;
  font-weight: 400;
`;
const NavItem = styled.div`
  margin: 0 17px;
`;
const LoadMore = styled.div`
  margin: 0 17px;
`;
const SignForm = styled.div`
  margin-left: 170px;
  display: flex;
  align-items: center;
`;
const SignItem = styled.div`
  margin: 0 15px;
`;
const Manufacturer = styled.div`
  width: 109px;
  height: 38px;
  background-color: #fdd200;
  border-radius: 5px;
  margin: 0 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Article = styled.article`
  margin-top: 60px;
  display: flex;
`;
const Map = styled.div`
  height: 100vh;
  width: 100%;
`;
const FactoryList = styled.div`
  width: 370px;
  height: 800px;
  position: fixed;
  border-radius: 8px;
  background-color: ${(props) => props.theme.bgColor};
  z-index: 5;
  bottom: 15px;
  top: 80px;
  left: 15px;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;
const FactoryListItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 15px 25px;
  &:hover {
    background-color: #f3f3f3;
  }
  div:nth-child(2) {
    span:first-child {
      margin-bottom: 10px;
    }
  }
`;

const MarkFilterBox = styled.div`
  z-index: 5;
  margin-top: 20px;
  padding: 0 3px;
  height: 45px;
  min-width: 540px;
  border-radius: 8px;
  position: fixed;
  left: 600px;
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  align-items: center;
`;
const FliterMenu = styled.div`
  margin: 0px 15px;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: 0.3em 0.3em 0 0 var(--color), inset 0.3em 0.3em 0 0 var(--color);
  /* 
  &:hover,
  &:focus {
    box-shadow: 0 0 0 0 var(--hover), inset 6em 3.5em 0 0 var(--hover);
  } */
`;
interface FilterMenuProps {
  filterColor: string;
}
const FilterMenuDiv = styled.div<FilterMenuProps>`
  width: 25px;
  height: 25px;
  background-color: ${(props) => props.filterColor};
  pointer-events: none;
  border-radius: 50%;
  margin-right: 8px;
`;

const FilterMenuSpan = styled.span``;

interface CoordinateInterfaceItem {
  name: string;
  zip_code: string;
  address: string;
  phone: string;
  field: string;
  etc: string;
  x: number;
  y: number;
}
interface CoordinateInterface extends Array<CoordinateInterfaceItem> {}

interface MarkerInterface extends Array<any> {}

interface FactoryInterface {
  name: string;
  zip_code: string;
  address: string;
  phone: string;
  field: string;
  etc: string;
}

function MapD() {
  const [map, setMap] = useState<any>([]);
  const [markers, setMarker] = useState<MarkerInterface>([]);
  const [markers2, setMarker2] = useState<MarkerInterface>([]);
  const [coordinates, setCoordinates] = useState<CoordinateInterface>([]);
  const [factoriesF, setFactoriesF] = useState<CoordinateInterface>([]);
  const [fabric, setFabric] = useState<CoordinateInterface>([]);
  const [cut, setCut] = useState<CoordinateInterface>([]);
  const [sewing, setSewing] = useState<CoordinateInterface>([]);
  const [sole, setSole] = useState<CoordinateInterface>([]);
  const [manufacturing, setManufacturing] = useState<CoordinateInterface>([]);

  //   const [filtered, setFiltered] = useState<CoordinateInterface>([]);

  // const [factories, setFactories] = useState<FactoryInterface[]>([]);
  //   const [process, setProcess] = useState([]);
  //   const [marker, setMarker] = useState("");
  //   const [onFilterClick] = () => setMarker("none");
  const [filter, setFilter] = useState("");
  const onClick = (event: any) => {
    let filter = event.target.innerText;
    filter === "솔" ? setFilter("SOLE") : setFilter(filter);
  };
  const [loading, setLoading] = useState(true);

  let test_lists = [
    {
      name: "현대스카이빙",
      zip_code: "46723",
      address: "부산 강서구 공항로383번길 126-1",
      phone: "051-315-8576",
      field: "SOLE",
      etc: "지도검색가능, 유선문의 후 방문(신발밑창)",
    },
    {
      name: "너스키니",
      zip_code: "46720",
      address: "부산 강서구 공항로767번나길 32",
      phone: "1599-1887",
      field: "제조",
      etc: "브랜드운영, 자체공장(간호화 제작)",
    },
    {
      name: "신창산업",
      zip_code: "46720",
      address: "부산 강서구 공항로767번다길 30",
      phone: "051-941-6634",
      field: "원단",
      etc: "지도검색가능, 유선문의 후 방문(신발부품, 화섬직물, 면직물)",
    },
    {
      name: "제이에스티",
      zip_code: "46719",
      address: "부산 강서구 공항진입로 8",
      phone: "051-265-3950",
      field: "제조",
      etc: "지도검색가능, 유선문의 후 방문(신발자재, 부품)",
    },
    {
      name: "삼덕통상",
      zip_code: "46728",
      address: "부산 강서구 낙동남로511번길 11",
      phone: "051-831-4631",
      field: "원단, 재단, 재봉, SOLE, 제조",
      etc: "중견기업, 베트남 공장(신발임가공, 전체공정)",
    },
    {
      name: "영인코리아",
      zip_code: "46728",
      address: "부산 강서구 낙동남로511번길 18",
      phone: "(070)5076-7476",
      field: "재단, 제조",
      etc: "중소기업(가죽갑피, 직물갑피, 플라스틱, 고무 신발제조)",
    },
    {
      name: "유성신소재2공장",
      zip_code: "46728",
      address: "부산 강서구 낙동남로533번길 41",
      phone: "051-941-2588",
      field: "SOLE",
      etc: "IP/CMP/UV 접착전문기업, 투컬러 일 400족, 원컬러 3,100족 생산 가능",
    },
    {
      name: "대영사",
      zip_code: "46757",
      address: "부산 강서구 녹산산단382로14번길 40",
      phone: "051-832-0123",
      field: "원단",
      etc: "신발 및 가방용 원단",
    },
    {
      name: "슬론테크",
      zip_code: "46757",
      address: "부산 강서구 녹산산단382로14번길 55 신발산업진흥센터 303호",
      phone: "(070)7808-2222",
      field: "SOLE, 제조",
      etc: "의료 스포츠 제품 구조설계, 3D 프린팅 시제품 제작(스포츠인솔 등)",
    },
    {
      name: "디엠테크코리아",
      zip_code: "46723",
      address: "부산 강서구 맥도길319번길 156-6",
      phone: "051-304-4488",
      field: "SOLE",
      etc: "신발부품, 금형제조",
    },
    {
      name: "동서테크",
      zip_code: "46729",
      address: "부산 강서구 생곡산단1로24번길 52",
      phone: "051-303-8111",
      field: "원단",
      etc: "천연가죽, 합성피혁",
    },
    {
      name: "덕일섬유",
      zip_code: "46707",
      address: "부산 강서구 식만로 207-19",
      phone: "051-941-0360",
      field: "제조",
      etc: "신발끈 제조, 세폭직물(직조 테이프 밀 브레이드 밴드&테이프), 베트남,인도네시아 공장 보유",
    },
    {
      name: "승일산업",
      zip_code: "46712",
      address: "부산 강서구 울만로25번길 99",
      phone: "051-301-2703",
      field: "원단",
      etc: "신발부품(합성피혁) 제조",
    },
    {
      name: "빌리자드",
      zip_code: "46700",
      address: "부산 강서구 평강로385번길 15",
      phone: "(070)4352-4335",
      field: "제조, 인솔",
      etc: "자체 브래드(구두,운동화 제조), 인솔제조",
    },
    {
      name: "욱일산업",
      zip_code: "46332",
      address: "부산 금정구 공단서로8번길 80-5 욱일산업(주)",
      phone: "051-525-6981",
      field: "제조",
      etc: "기타신발제조업(나라장터 축구화 판매)",
    },
    {
      name: "본필",
      zip_code: "46206",
      address: "부산 금정구 대두로19번길 20",
      phone: "051-517-2527",
      field: "원단, 제단, 재봉, SOLE, 제조",
      etc: "골프화, 스포츠화, 등산화, 워킹화, 트레킹화, 런닝화 판매 및 제조, OEM생산 가능",
    },
    {
      name: "나인테일",
      zip_code: "46270",
      address: "부산 금정구 동부곡로15번길 76 101동 1502호",
      phone: "051-581-1374",
      field: "원단, 제단, 재봉, SOLE, 제조",
      etc: "신발, 운동화, 슬리퍼, 단화 제조 / 300족부터 제작가능, 스니커즈(17,000 ~), 슬리퍼(8,000~)",
    },
    {
      name: "근하산업",
      zip_code: "46260",
      address: "부산 금정구 회천로32번길 34",
      phone: "051-531-0597",
      field: "재단",
      etc: "신발재단, 가죽재단",
    },
    {
      name: "빅토스",
      zip_code: "46028",
      address: "부산 기장군 장안읍 명례산단2로 60 (주)빅토스",
      phone: "051-314-4242",
      field: "제조",
      etc: "안전화, 장화 제조 및 판매",
    },
    {
      name: "빅스탑",
      zip_code: "46027",
      address: "부산 기장군 정관읍 산단4로 49",
      phone: "051-715-1145",
      field: "제조",
      etc: "안전화, 장화, 위생장화, 화학장화 ",
    },
    {
      name: "가보스",
      zip_code: "46027",
      address: "부산 기장군 정관읍 산단4로 49 가보스",
      phone: "051-715-8878",
      field: "제조",
      etc: "안전화, 위생장화, 논슬립장화, 주방장화, 요딩장화 제조",
    },
    {
      name: "태경산업",
      zip_code: "48526",
      address: "부산 남구 용호로110번길 33 지하 1층",
      phone: "051-626-9395",
      field: "제조",
      etc: "슬리퍼 제조(10,000~)",
    },
    {
      name: "금성합포",
      zip_code: "47271",
      address: "부산 부산진구 가야대로507번길 162",
      phone: "051-896-9366",
      field: "원단",
      etc: "합포(원단, 스펀지 TPU필름 등), 신발 합포 라텍스(호인, 합포)",
    },
    {
      name: "유진합포",
      zip_code: "47271",
      address: "부산 부산진구 가야대로507번길 162-3 유진합포 ",
      phone: "051-891-1383",
      field: "원단",
      etc: "합포(원단, 스펀지 TPU필름 등), 신발 합포 라텍스(호인, 합포)",
    },
    {
      name: "DK트레이딩",
      zip_code: "47160",
      address: "부산 부산진구 백양순환로 19",
      phone: "",
      field: "제조",
      etc: "실내화, 슬리퍼",
    },
    {
      name: "프리토",
      zip_code: "47137",
      address: "부산 부산진구 백양순환로119번길 12-16 4층",
      phone: "0507-1410-1139",
      field: "제조",
      etc: "구두, 수제화 슬리퍼, 블로퍼 등 신발제조 및 판매",
    },
    {
      name: "뽀너스",
      zip_code: "47193",
      address: "부산 부산진구 시민공원로20번길 8 2층 뽀너스",
      phone: "010-8373-2239",
      field: "제조",
      etc: "간호화 제조 및 판매",
    },
    {
      name: "일신제화",
      zip_code: "47344",
      address: "부산 부산진구 신암로155번길 41",
      phone: "051-646-7090",
      field: "제조",
      etc: "위치상이, 유선문의 필요, 슬리퍼 제조 및 판매",
    },
    {
      name: "슈맨제화",
      zip_code: "47343",
      address: "부산 부산진구 신암로96번길 58 2층",
      phone: "010-5696-8150",
      field: "제조",
      etc: "스니커즈, 수제화, 남성화, 여성화 제조 ",
    },
    {
      name: "오투랩",
      zip_code: "47340",
      address: "부산 부산진구 엄광로 176",
      phone: "051-710-4221",
      field: "SOLE",
      etc: "기능성 인솔, 깔창 제조 및 판매",
    },
    {
      name: "이루",
      zip_code: "46547",
      address: "부산 북구 금곡대로20번길 49",
      phone: "051-334-1007",
      field: "제조",
      etc: "운동화, 워킹화, 스티커즈, 아동화, 샌들(컬러당 300족, 두세컬러 1,000족)",
    },
    {
      name: "명문스포츠",
      zip_code: "46504",
      address: "부산 북구 낙동대로1570번가길 7-1",
      phone: "051-301-1940",
      field: "SOLE, 제조",
      etc: "캔버스화, 키높이, 키높이깔창 등 제조 및 판매",
    },
    {
      name: "에반산업",
      zip_code: "47005",
      address: "부산 사상구 가야대로 383",
      phone: "051-328-0553",
      field: "SOLE, 제조",
      etc: "기능성 신발, 인솔 제조, 자체브랜드'에어아치' 운영",
    },
    {
      name: "유성신소재",
      zip_code: "46987",
      address: "부산 사상구 가야대로103번길 33 유성산업",
      phone: "051-311-5163",
      field: "SOLE",
      etc: "미드솔 제작(월 생산능력 150,000족), 파일론 등",
    },
    {
      name: "우성화학",
      zip_code: "46986",
      address: "부산 사상구 가야대로133번길 33 1층",
      phone: "051-327-8830",
      field: "제조",
      etc: "고무신발 제조(고무신, 리본장화, 털신, 털부츠, 장화 등)",
    },
    {
      name: "미진테프",
      zip_code: "47021",
      address: "부산 사상구 가야대로176번길 56",
      phone: "051-316-3251",
      field: "원단, 재단",
      etc: "신발부품 및 재단 제조, 합포, 라미네이팅",
    },
    {
      name: "동우무역산업",
      zip_code: "47022",
      address: "부산 사상구 가야대로230번길 8 동우무역산업",
      phone: "051-312-7791",
      field: "SOLE, 제조",
      etc: "신발깔창, 뒷굽 제조",
    },
    {
      name: "오스타",
      zip_code: "46976",
      address: "부산 사상구 괘감로 59-11 301호",
      phone: "051-324-9210, 010-9392-4849",
      field: "제조",
      etc: "골프화, 스니커즈, 슬리퍼, 운동화, 아동화 제작, 소량생산(스니커즈 300족 ~ 슬리퍼 500족 ~) 샘플생산가능",
    },
    {
      name: "유한그린",
      zip_code: "46990",
      address: "부산 사상구 낙동대로 1044",
      phone: "051-314-0347",
      field: "제조",
      etc: "안전화 제조 및 도소매",
    },
    {
      name: "동광금형",
      zip_code: "46912",
      address: "부산 사상구 낙동대로 1272",
      phone: "051-302-2828",
      field: "SOLE",
      etc: "신발 금형 제조",
    },
    {
      name: "바스코",
      zip_code: "46908",
      address: "부산 사상구 낙동대로 1344",
      phone: "051-304-2270",
      field: "SOLE, 제조",
      etc: "기능성 안창, 완제품 조립, 신발부품 제조",
    },
    {
      name: "한국프라마스 R&D Center",
      zip_code: "46904",
      address: "부산 사상구 낙동대로 1426",
      phone: "051-712-5000",
      field: "제조",
      etc: "신발부속품(라스트 개발, 제작), 플라스틱성형제품 제조 및 판매",
    },
    {
      name: "동원엠하우스",
      zip_code: "46911",
      address: "부산 사상구 낙동대로1302번길 10",
      phone: "051-317-2690",
      field: "제조",
      etc: "신사화, 캐주얼(로퍼등) 신발제조",
    },
    {
      name: "동우화학",
      zip_code: "46909",
      address: "부산 사상구 낙동대로1348번길 84",
      phone: "051-311-7930",
      field: "SOLE, 제조",
      etc: "지도검색가능, 유선문의 후 방문(신발제조, 우레탄, 고무 등)",
    },
    {
      name: "케이씨고려",
      zip_code: "46907",
      address: "부산 사상구 낙동대로1390번길 46 (주)케이씨고려",
      phone: "051-326-3695",
      field: "SOLE",
      etc: "신발 사출, 성형",
    },
    {
      name: "네오슈테크",
      zip_code: "46907",
      address: "부산 사상구 낙동대로1396번길 54 3층",
      phone: "051-302-3070",
      field: "SOLE",
      etc: "아웃솔, 파이론, PU, IP 등 신발 목형 제작 금형설계, 2d, 3d 모델링",
    },
    {
      name: "슈젠 부산사무소",
      zip_code: "46907",
      address: "부산 사상구 낙동대로1412번길 40",
      phone: "",
      field: "제조",
      etc: "운동화, 워킹화, 스티커즈",
    },
    {
      name: "ACN",
      zip_code: "46903",
      address: "부산 사상구 낙동대로1468번길 33-12 2층",
      phone: "",
      field: "SOLE",
      etc: "기능성인솔, 우레탄인솔 등 인솔 제작",
    },
    {
      name: "경동테크",
      zip_code: "46903",
      address: "부산 사상구 낙동대로1468번길 33-12 경동테크",
      phone: "051-305-6577",
      field: "SOLE",
      etc: "기능성 인솔, 우레탄인솔, PU 등 ",
    },
    {
      name: "동화",
      zip_code: "47030",
      address: "부산 사상구 낙동대로901번길 22",
      phone: "051-326-7793",
      field: "SOLE",
      etc: "지도검색안됨, 유선문의 필요(파이론(신발부품))",
    },
    {
      name: "영창에코(엑스솔)",
      zip_code: "47030",
      address: "부산 사상구 낙동대로901번길 40",
      phone: "051-301-7793",
      field: "SOLE",
      etc: "기능설 인솔 개발 및 제조, 판매",
    },
    {
      name: "청운산업사",
      zip_code: "47030",
      address: "부산 사상구 낙동대로943번길 23 청운산업",
      phone: "051-315-7711",
      field: "SOLE",
      etc: "신발부품(타이론) 제조",
    },
    {
      name: "동아합포",
      zip_code: "47016",
      address: "부산 사상구 동주로 24-3",
      phone: "051-896-8411",
      field: "원단",
      etc: "TPU필름 원단합포, 본딩, 신발제작 등",
    },
    {
      name: "충남재단",
      zip_code: "46916",
      address: "부산 사상구 모라로37번길 43",
      phone: "051-305-6118",
      field: "재단",
      etc: "지도검색안됨, 유선문의 필요",
    },
    {
      name: "영진에스앤에이무역",
      zip_code: "46930",
      address: "부산 사상구 백양대로 887-12 3층",
      phone: "051-317-7700",
      field: "제조",
      etc: "기능성운동화, 부츠, 워커, 안전화 신발 제조",
    },
    {
      name: "샤운트코리아",
      zip_code: "46927",
      address: "부산 사상구 백양대로 966",
      phone: "(070)4251-3887",
      field: "제조",
      etc: "신발디자인 및 생산",
    },
    {
      name: "제이드엠",
      zip_code: "46924",
      address: "부산 사상구 사상로 415",
      phone: "051-301-0631",
      field: "제조",
      etc: "신발, 신발부품제조/신발임가공, 신발연구 및 디자인 개발",
    },
    {
      name: "엘케이코리아",
      zip_code: "46925",
      address: "부산 사상구 사상로 422(네이버) 부산 사상구 낙동대로1348번길 45",
      phone: "051-305-9809",
      field: "제조",
      etc: "위치상이, 기업명 상이(엘케이산업), 스포츠화, 골프화, 등산화 제조",
    },
    {
      name: "퍼스널라이즈드킥스아이엔시",
      zip_code: "46975",
      address: "부산 사상구 사상로162번길 30",
      phone: "051-324-9350, 010-4028-0977",
      field: "제조",
      etc: "특수화, 등산화, 안전화 개발대행(샘플 및 생산준비)",
    },
    {
      name: "하이테크",
      zip_code: "46975",
      address: "부산 사상구 사상로162번길 30",
      phone: "051-324-9350",
      field: "제조",
      etc: "특수화, 등산화, 안전화 개발대행(샘플 및 생산준비)",
    },
    {
      name: "바라크",
      zip_code: "46947",
      address: "부산 사상구 사상로333번길 62",
      phone: "051-302-1561",
      field: "제조",
      etc: "등산화, 트레킹, 런닝화, 샌들 등 제조(노스페이스, 블랙야크 등 15개브랜드 신발 생산)",
    },
    {
      name: "보림산업",
      zip_code: "46923",
      address: "부산 사상구 사상로433번길 51 (주)보림산업",
      phone: "",
      field: "재단",
      etc: "재단 및 특수재단",
    },
    {
      name: "오주무역",
      zip_code: "46923",
      address: "부산 사상구 사상로439번길 62 (주)천해고압용기",
      phone: "051-322-0810",
      field: "제조",
      etc: "지도검색안됨, 유선문의 필요(가죽갑피신발, 직물갑피신발 제조)",
    },
    {
      name: "지엔케이",
      zip_code: "46916",
      address: "부산 사상구 사상로551번길 39 2층",
      phone: "051-303-0967",
      field: "SOLE",
      etc: "신발UV접착",
    },
    {
      name: "세한상사",
      zip_code: "46910",
      address: "부산 사상구 삼덕로 11",
      phone: "051-305-7051",
      field: "SOLE",
      etc: "PU(폴리우레탄) 인솔,미드솔, 아웃솔 제조업체",
    },
    {
      name: "현대UV산업",
      zip_code: "47028",
      address: "부산 사상구 장인로37번길 59",
      phone: "051-322-6146",
      field: "SOLE",
      etc: "신발UV접착",
    },
    {
      name: "한국에스피",
      zip_code: "47021",
      address: "부산 사상구 학감대로178번길 17 (2층) 한국에스피",
      phone: "051-902-0928",
      field: "SOLE",
      etc: "우레탄 아웃솔, 미드솔, 인솔, PU ",
    },
    {
      name: "대영섬유",
      zip_code: "47047",
      address: "부산 사상구 학장로248번길 28 (주)대영섬유",
      phone: "051-315-0321",
      field: "재봉, SOLE",
      etc: "원부자재 개발, 갑피, 중창, 안창",
    },
    {
      name: "삼양통상 정문경비실",
      zip_code: "49444",
      address: "부산 사하구 을숙도대로 651",
      phone: "051-204-7711",
      field: "원단, 제조",
      etc: "삼양통상㈜의 공장, 모피 및 가죽제조, 피혁원단, 혁제운동화 제조",
    },
    {
      name: "삼양통상부산제1공장",
      zip_code: "49444",
      address: "부산 사하구 을숙도대로 651",
      phone: "051-710-7511",
      field: "원단, 제조",
      etc: "",
    },
    {
      name: "대신인더스",
      zip_code: "49463",
      address: "부산 사하구 장평로 204",
      phone: "051-266-4441",
      field: "제조",
      etc: "안전화, 안전장화, 방화신발, 요딩장화 제조",
    },
    {
      name: "에프앤에이글로벌",
      zip_code: "48300",
      address: "부산 수영구 수영로 532 부성빌딩 7층",
      phone: "(070)4268-0965",
      field: "제조",
      etc: "신발제조업, 브랜드신발 제조, 여성전용 운동화, 신규브랜드'마카롱핏'운영",
    },
    {
      name: "대효",
      zip_code: "47536",
      address: "부산 연제구 해맞이로 23",
      phone: "(070)7984-1670",
      field: "제조",
      etc: "구두류 제조",
    },
    {
      name: "남경제화",
      zip_code: "48976",
      address: "부산 중구 보수대로 34 덕수빌딩4층",
      phone: "010-3872-9778",
      field: "제조",
      etc: "여성수제화, 유니화, 주문제작(소량가능)",
    },
    {
      name: "워크제화",
      zip_code: "48964",
      address: "부산 중구 보수대로124번길 58",
      phone: "051-246-6869",
      field: "제조",
      etc: "수제화제조, 구두, 통굽, 여성화",
    },
    {
      name: "티엔에스무역",
      zip_code: "48984",
      address: "부산 중구 태종로 14-1 반도빌딩 4층",
      phone: "051-466-9690",
      field: "제조",
      etc: "신발제조, 디자인 및 수출(유선문의 필요)",
    },
    {
      name: "신화산업",
      zip_code: "48000",
      address: "부산 해운대구 반송로 859",
      phone: "051-544-3040",
      field: "제조",
      etc: "지도검색가능, 유선문의 후 방문(샌달, 캐주얼운동화, 신발부품 제조 및 가공)",
    },
    {
      name: "한국프라마스",
      zip_code: "48099",
      address: "부산 해운대구 해운대해변로298번길 24",
      phone: "051-731-5102",
      field: "제조",
      etc: "신발부속품(라스트 개발, 제작), 플라스틱성형제품 제조 및 판매",
    },
    {
      name: "우성우레탄",
      zip_code: "-",
      address: "부산 강서구 녹산산단382로 50번길 28",
      phone: "051-831-4471",
      field: "SOLE",
      etc: "신발 밑창, 아웃솔 금형",
    },
    {
      name: "동일합포",
      zip_code: "-",
      address: "부산 사상구 가야대로 133",
      phone: "051-893-1907",
      field: "재봉",
      etc: "무재봉, 필름접착",
    },
    {
      name: "월성피혁상사",
      zip_code: "-",
      address: "부산 부산진구 신암로 101-1",
      phone: "051- 638-0909",
      field: "원단",
      etc: "가죽원단, 신발용가죽, 피혁",
    },
    {
      name: "엠비물산 주식회사",
      zip_code: "-",
      address: "부산 강서구 유통단지1로 41, 104동 107호",
      phone: "010-4656-2254",
      field: "원단",
      etc: "신세틱 등 합성피혁 도매업체(신발원, 부자재)",
    },
    {
      name: "청운산업사",
      zip_code: "-",
      address: "부산 강서구 신포길 111(명지동)",
      phone: "051- 315-7711",
      field: "SOLE",
      etc: "IP 및 파이론(신장 중장) 제조 업체",
    },
    {
      name: "제이에스 이노베이션",
      zip_code: "-",
      address: "부산 사하구 하신번영로 107번길 6",
      phone: "051- 202-7872",
      field: "제조",
      etc: "신발용 끈",
    },
    {
      name: "케이원테크",
      zip_code: "-",
      address: "부산 사상구 낙동대로1412번길 8(삼락동)",
      phone: "0507-1361-9244",
      field: "SOLE",
      etc: "IP, IU, 아웃솔(신발부품), EVA사출발포신발창 3,000원, 샌달 4,500원, 구두창 3,500원",
    },
    {
      name: "다누테크",
      zip_code: "-",
      address: "부산 강서구 금호순서길89번가길 39-18",
      phone: "010-3833-1766",
      field: "SOLE",
      etc: "인젝션 파일론 소재 창 생산, 브랜드 '토러스' 운영",
    },
    {
      name: "태정화학",
      zip_code: "-",
      address: "부산 사상구 사상로401번길 10 (덕포동)",
      phone: "051-305-2408",
      field: "SOLE",
      etc: "신발 밑창(아웃솔)",
    },
    {
      name: "원광트레이딩",
      zip_code: "-",
      address: "부산 사상구 모라로 22, 1208호",
      phone: "051-315-9999",
      field: "SOLE",
      etc: "신발창",
    },
    {
      name: "신진화학",
      zip_code: "-",
      address: "부산 사상구 낙동대로1404번길 7 (삼락동)",
      phone: "051-301-4168",
      field: "제조", //edit 신발부품 -> 제조
      etc: "신발부분품 제조업",
    },
    {
      name: "신일산업",
      zip_code: "-",
      address: "부산 사하구 을숙도대로677번길 12",
      phone: "051-203-6481",
      field: "SOLE",
      etc: "인솔 제작",
    },
    {
      name: "성광테크",
      zip_code: "-",
      address: "부산 사상구 감전천로 192",
      phone: "051-327-2468",
      field: "SOLE",
      etc: "기능성 인솔",
    },
    {
      name: "백산실업",
      zip_code: "-",
      address: "부산 강서구 강동동 1291-5",
      phone: "051-972-3656",
      field: "SOLE",
      etc: "전문인솔, 발열깔창",
    },
    {
      name: "동진공업㈜",
      zip_code: "-",
      address: "부산 사상구 사상로367번길 73",
      phone: "070-7017-6390~1",
      field: "제조",
      etc: "신발구멍쇠, 신발부분품(금속부품) 제조",
    },
    {
      name: "동성금속공업사",
      zip_code: "-",
      address: "부산 사상구 낙동대로1384번길 11",
      phone: "051-303-6764",
      field: "제조",
      etc: "구멍쇠, D-링, 버클, 가시메, 후크, 신발악세서리",
    },
    {
      name: "델타코리아",
      zip_code: "-",
      address: "부산 사상구 낙동대로1468번길 (삼락동)",
      phone: "051-305-7790",
      field: "SOLE",
      etc: "PU우레탄, 미드솔, 아웃솔, 신발부품",
    },
    {
      name: "대원금속",
      zip_code: "-",
      address: "부산 사상구 학장로 169번길 34-9",
      phone: "051-316-5596",
      field: "제조",
      etc: "신발부품(1차금속)",
    },
    {
      name: "대영정공㈜",
      zip_code: "-",
      address: "부산 사상구 사상로 393번길 56",
      phone: "070-7015-7502",
      field: "제조",
      etc: "신발부품(1차금속)",
    },
    {
      name: "㈜태양신소재",
      zip_code: "-",
      address: "부산 사상구 사상로 439번길 10",
      phone: "051-972-1602",
      field: "SOLE",
      etc: "신발부품 제조(신발 중창)",
    },
    {
      name: "㈜숄텍SOLE TECH CP.,LTD",
      zip_code: "-",
      address: "부산 사상구 사상로333번길 26 (덕포동)",
      phone: "051-301-2071",
      field: "SOLE",
      etc: "신발류부품 제조,수출입. 주로 신발 안창",
    },
    {
      name: "(주)동우무역산업",
      zip_code: "-",
      address: "부산 사상구 가야대로230번길 8",
      phone: "051-312-7791",
      field: "SOLE, 제조",
      etc: "신발깔창, 인솔, 뒷굽 제조",
    },
    {
      name: "동신지엠티",
      zip_code: "-",
      address: "부산 사상구 학감대로 222번길 27",
      phone: "051-316-8852",
      field: "재단, 재봉",
      etc: "나노프린팅, 노쏘, 고주파 커팅 등 갑피 임가공",
    },
    {
      name: "대성공업㈜",
      zip_code: "-",
      address: "부산 사상구 낙동대로 1318번길 67",
      phone: "051-301-6681~4",
      field: "제조",
      etc: "신발용 금속제장식품, 구멍쇠 제조",
    },
    {
      name: "(주)영창에코 YOUNG CHANG ECO CO.,LTD",
      zip_code: "-",
      address: "부산 사상구 낙동대로 901번길 40 (감전동)",
      phone: "051-301-7793",
      field: "SOLE, 제조",
      etc: "신발 부분품 제조, 인솔",
    },
    {
      name: "(주)아치발란스",
      zip_code: "-",
      address: "부산 금정구 개좌로 192 4F",
      phone: "070-7335-5895",
      field: "SOLE",
      etc: "교정인솔",
    },
    {
      name: "㈜신경",
      zip_code: "-",
      address: "부산 강서구 신포길39번길 16",
      phone: "051-710-3772",
      field: "제조",
      etc: "다이얼 및 와이어(wire closure)",
    },
    {
      name: "(주)윤텍스타일",
      zip_code: "-",
      address: "부산 사하구 신산로 13(신평동)",
      phone: "051-266-4770",
      field: "원단",
      etc: "염색가공, 편직, 기능성매쉬 생산",
    },
    {
      name: "한영산업㈜",
      zip_code: "-",
      address: "부산 강서구 낙동남로 533번길 36",
      phone: "051-302-1925",
      field: "원단",
      etc: "신발용 부직포(oe Box, Molding Backer 및 Heel Counter에 적용되는 부위에 부직포를 응용한 EVA Coating 제품)",
    },
    {
      name: "중앙섬유㈜",
      zip_code: "-",
      address: "부산 강서구 녹산산단 231로 21",
      phone: "051-831-5490",
      field: "원단",
      etc: "직조(신발원단)",
    },
    {
      name: "상은섬유㈜",
      zip_code: "-",
      address: "부산 강서구 녹산산단 382로 14번길 55, 214호",
      phone: "051-832-0368",
      field: "원단",
      etc: "신발부품",
    },
    {
      name: "모계염직㈜",
      zip_code: "-",
      address: "부산 사하구 신산로 27",
      phone: "051-207-5210~4",
      field: "원단",
      etc: "섬유, 사, 직물, 편직 염색, 가공",
    },
    {
      name: "대유통상",
      zip_code: "-",
      address: "부산 강서구 녹산산단261로 15 (송정동)",
      phone: "051-305-6217",
      field: "신발부품",
      etc: "신발끈, 신발부품 외",
    },
    {
      name: "대송섬유",
      zip_code: "-",
      address: "부산 강서구 강동중곡2길 8 (강동동)",
      phone: "051-941-4540",
      field: "원단, 재단",
      etc: "신발재단물(안감용원단) 제조",
    },
    {
      name: "광명화스너㈜",
      zip_code: "-",
      address: "부산 사하구 신평동 651-1번지",
      phone: "051-207-4791",
      field: "원단",
      etc: "매직테이프 (찍찍이)",
    },
    {
      name: "경은산업㈜",
      zip_code: "-",
      address: "부산 사하구 하신번영로 127번길 11",
      phone: "051-207-9985",
      field: "원단",
      etc: "원단 염색 가공, 섬유제품 제조",
    },
    {
      name: "㈜지비라이트",
      zip_code: "-",
      address: "부산 강서구 녹산산단 27로 127(송정동)",
      phone: "051-831-2777",
      field: "원단",
      etc: "재귀반사필름, 반사안전제품",
    },
    {
      name: "주식회사 유일텍스",
      zip_code: "-",
      address: "부산 강서구 유통단지1로 50, 204동 116호 (대저2동,부산티플랙스)",
      phone: "010-4110-1234",
      field: "원단",
      etc: "화학섬유(MESH) 제조",
    },
    {
      name: "㈜유영산업",
      zip_code: "-",
      address: "부산 사하구 신산로 130 (신평동)",
      phone: "051-831-6511",
      field: "원단",
      etc: "화학섬유직물(신발원단용)",
    },
    {
      name: "주식회사 모계",
      zip_code: "-",
      address: "부산 사하구 하신번영로 127번길 11",
      phone: "051-301-5777",
      field: "원단",
      etc: "신발용 원단",
    },
    {
      name: "주식회사 동손텍스타일",
      zip_code: "-",
      address: "부산 강서구 유통단지1로 50, 202동 217호 (대저2동,부산티플렉스)",
      phone: "051-796-0352",
      field: "원단",
      etc: "신발섬유제품 제조업",
    },
    {
      name: "㈜덕일섬유",
      zip_code: "-",
      address: "부산 강서구 식만로 207-9",
      phone: "051-941-0360",
      field: "제조",
      etc: "신발레이스, 탄성끈 신발끈, 웨빙 테이프, 바인딩 테이프",
    },
    {
      name: "성화산업사",
      zip_code: "-",
      address: "부산 금정구 개좌로 201",
      phone: "051-524-9494",
      field: "원단",
      etc: "직조라벨, 니트",
    },
    {
      name: "동진섬유㈜",
      zip_code: "-",
      address: "부산 사하구 신산로 6",
      phone: "051-852-9991",
      field: "원단",
      etc: "TRICOT, DOUBLE RASCHEL, FRENCH, CIRCULAR, JACQUARD 등",
    },
    {
      name: "㈜부광",
      zip_code: "-",
      address: "부산 사하구 신산로 10 (신평동)",
      phone: "051-293-8405~16",
      field: "원단",
      etc: "직물, 메쉬, 트리코트 원단",
    },
    {
      name: "신원화성",
      zip_code: "-",
      address:
        "부산 사상구 삼락동 356-6(주소상이)경상남도 김해시 대동면 동남로 225",
      phone: "051-305-1010",
      field: "원단",
      etc: "합성피혁, 신발원단제조",
    },
    {
      name: "주식회사 현대식모",
      zip_code: "-",
      address: "부산 강서구 녹산산단 382로 14번가길 13",
      phone: "051-831-4057",
      field: "원단",
      etc: "인조피혁, 합성피혁",
    },
    {
      name: "㈜제이에스산업",
      zip_code: "-",
      address: "부산 사하구 다산로 267",
      phone: "051-266-0060",
      field: "원단",
      etc: "피혁(소가죽)",
    },
    {
      name: "㈜정산인터내셔널",
      zip_code: "-",
      address: "부산 강서구 녹산산단 382로 49번길 11",
      phone: "051-960-3106",
      field: "원단",
      etc: "합성피혁, 섬유제품",
    },
    {
      name: "㈜화인 제2공장",
      zip_code: "-",
      address: "부산 사하구 다산로 175번길 47",
      phone: "051-262-9715",
      field: "원단",
      etc: "신발용 고무 생산",
    },
    {
      name: "(주)지엔인터내셔날",
      zip_code: "-",
      address: "부산 사상구 사상로 363, 2층(덕포동)",
      phone: "-",
      field: "SOLE",
      etc: "EVA Compounds 원료 생산 및 IP",
    },
    {
      name: "주식회사 동림케미칼(DRC)",
      zip_code: "-",
      address:
        "부산 부산진구 당감서로 152, 207호(당감동, 한국신발피혁연구원 창업보육센터)",
      phone: "-",
      field: "SOLE",
      etc: "EVA Compounds 원료",
    },
    {
      name: "호성금속",
      zip_code: "-",
      address: "부산 사하구 다산로 225번길 30",
      phone: "051-263-4942",
      field: "제조",
      etc: "신발지조, 악세서리 바렐도금",
    },
    {
      name: "한진화학",
      zip_code: "-",
      address: "부산 사상구 사상로 393번길 55",
      phone: "051-305-0130",
      field: "SOLE",
      etc: "EVA스폰지(미드솔, 인솔, 아웃솔 사용)",
    },
    {
      name: "필진통상㈜",
      zip_code: "-",
      address: "부산 부산진구 서면문화로 27, 1420호",
      phone: "051-818-8860-2",
      field: "원단",
      etc: "화학제품,합성수지,합성고무 도매,수출입",
    },
    {
      name: "주원테크㈜",
      zip_code: "-",
      address: "부산 강서구 녹산산단 382로 14번가길 14",
      phone: "051-832-0884",
      field: "SOLE",
      etc: "TPU 및 접착용 핫멜트 필름(신발, 의류부속품)",
    },
    {
      name: "이진화학㈜",
      zip_code: "-",
      address: "부산 강서구 녹산산단262로 15",
      phone: "051-711-2882",
      field: "제조",
      etc: "각종 산업용 접착제, 신발 접착제",
    },
    {
      name: "욱성화학㈜",
      zip_code: "-",
      address: "부산 금정구 개좌로 174",
      phone: "051-523-1515",
      field: "원단",
      etc: "안료 (무기, 유기, 형광안료)",
    },
    {
      name: "신양케미칼",
      zip_code: "-",
      address: "부산 사상구 사상로 349번길 42",
      phone: "051-322-8701~2",
      field: "원단",
      etc: "특수발포 고무제품 (네오프렌)",
    },
    {
      name: "삼원파이론 (센스풋)",
      zip_code: "-",
      address: "부산 사상구 삼덕로 73번길 41",
      phone: "051-304-1592",
      field: "SOLE",
      etc: "인솔/깔창, 미끄럼방지 슬리퍼/안전화, '센스풋'브랜드운영",
    },
    {
      name: "대한합포",
      zip_code: "-",
      address: "부산 사상구 낙동대로1318번길 22 (삼락동)",
      phone: "051-303-5535",
      field: "원단",
      etc: "신발부품, 원단 합포",
    },
    {
      name: "대한산업",
      zip_code: "-",
      address: "부산 강서구 녹산산단290로 27-10",
      phone: "051-831-9071",
      field: "제조",
      etc: "고무패킹류 제조",
    },
    {
      name: "대륭기업㈜",
      zip_code: "-",
      address: "부산 중구 자갈치로 42, 602호",
      phone: "051-241-4080",
      field: "제조",
      etc: "자소성스프레이폼, 합성수지, 점착제, 접착제, 폴리우레탄폼",
    },
    {
      name: "(주)퓨쳐테크",
      zip_code: "-",
      address: "부산 기장군 산단7로 59",
      phone: "051-727-4579",
      field: "원단",
      etc: "신발(가죽갑피,직물갑피,플라스틱,고무),선박용고무부품 제조",
    },
    {
      name: "주식회사 삼영시스템",
      zip_code: "-",
      address: "부산 사상구 학감대로237번길 36 (감전동)",
      phone: "051-317-5605",
      field: "제조",
      etc: "신발제조업프로세서 샘플제작 납품전문",
    },
    {
      name: "(주)부원인더스트리",
      zip_code: "-",
      address: "부산시 해운대구 센텀동로 35 센텀SH벨리 306호",
      phone: "051-746-6700",
      field: "제조",
      etc: "착색제, 컴파운드(신발부분품) 제조",
    },
    {
      name: "주식회사 모라에이스",
      zip_code: "-",
      address: "부산 사상구 모라로52번길 26 (모라동)",
      phone: "051-301-3090",
      field: "제조",
      etc: "신발 부분품제조업, 버핑,접착 등",
    },
    {
      name: "㈜동화",
      zip_code: "-",
      address: "부산 사상구 낙동대로 901번길 22",
      phone: "051-326-7793",
      field: "SOLE",
      etc: "파이론(신발부품)",
    },
    {
      name: "주식회사 대성인더스트리",
      zip_code: "-",
      address: "부산 사상구 주감로 223-10 (주례동)",
      phone: "051-311-0905",
      field: "원단",
      etc: "신발갑피, 승화전사(특수인쇄)",
    },
    {
      name: "㈜화인 FINE Inc.",
      zip_code: "-",
      address: "부산 사하구 다산로175번길 51(다대동)",
      phone: "051-262-9714",
      field: "원단",
      etc: "신발갑피용 고무시트",
    },
    {
      name: "㈜한국유화",
      zip_code: "-",
      address: "부산 강서구 녹산산단165로 36-20 녹산국가산업단지",
      phone: "051-831-0901 ~ 5",
      field: "신발부품",
      etc: "산업용 특수필름, TPU 시트",
    },
    {
      name: "(주)아셈스 ASSEMS",
      zip_code: "-",
      address: "부산 사하구 을숙도대로873번길 31",
      phone: "051-713-3900",
      field: "신발부품",
      etc: "핫멜트 접착필름, 합포",
    },
    {
      name: "㈜성신신소재",
      zip_code: "-",
      address: "부산 해운대구 센텀중앙로 97, 센텀스카이비즈 B동 607,608호",
      phone: "051-927-2001~2",
      field: "SOLE",
      etc: "신발중창 (미드솔)",
    },
    {
      name: "㈜동성화학",
      zip_code: "-",
      address: "부산 사하구 신산로 99",
      phone: "051-200-4500",
      field: "SOLE",
      etc: "신발창용 폴리우레탄수지, 합성피혁용 수지 등",
    },
    {
      name: "한국비티엠(BTM KOREA)",
      zip_code: "-",
      address: "부산 강서구 제도로 791(강동동)",
      phone: "051-261-1779",
      field: "SOLE",
      etc: "사출, 생산 업체",
    },
    {
      name: "천일정밀",
      zip_code: "-",
      address: "부산 사상구 사상로 425(모라동)",
      phone: "051-927-0036",
      field: "SOLE",
      etc: "신발철형, 그래이딩, PVC(재봉)",
    },
    {
      name: "부원금형",
      zip_code: "-",
      address: "부산 사상구 사상로385번길 10(덕포동)",
      phone: "051-301-9901",
      field: "SOLE",
      etc: "금형제조",
    },
    {
      name: "명성기술",
      zip_code: "-",
      address: "부산시 강서구 녹산산단 382로14번길 55(신발산업진흥센터) 311호",
      phone: "010 9971 6006",
      field: "SOLE",
      etc: "금형, 기능성신발, 파피스",
    },
    {
      name: "대호정밀",
      zip_code: "-",
      address: "부산 사상구 학감대로 216-23",
      phone: "051-327-1582",
      field: "SOLE",
      etc: "신발금형",
    },
    {
      name: "케이씨엠코퍼레이션",
      zip_code: "-",
      address: "부산 사상구 엄궁로 14 (엄궁동)",
      phone: "051-317-1172",
      field: "SOLE",
      etc: "신발부품, 몰드 제작",
    },
    {
      name: "부산레이져목형",
      zip_code: "-",
      address: "부산 사상구 사상로 362",
      phone: "051-637-9791~3",
      field: "SOLE",
      etc: "주형 및 금형, 외피 및 내피재단",
    },
    {
      name: "부경금형",
      zip_code: "-",
      address: "부산 강서구 녹산산단 382로 14번길 55, 307호",
      phone: "051-303-1418~9",
      field: "SOLE",
      etc: "금형",
    },
    {
      name: "경령정밀",
      zip_code: "-",
      address: "부산 사하구 을숙도대로 651",
      phone: "051-292-1983",
      field: "SOLE",
      etc: "주형 및 금형 제조업",
    },
    {
      name: "㈜한국티엠에스",
      zip_code: "-",
      address: "부산 사상구 학장로 135전길 122",
      phone: "051-313-0231",
      field: "SOLE",
      etc: "신발부품, 금형",
    },
    {
      name: "(주)유성에이텍",
      zip_code: "-",
      address: "부산 사상구 대동로 204",
      phone: "051-313-0231",
      field: "SOLE",
      etc: "신발 금형",
    },
    {
      name: "㈜에프아이티몰드",
      zip_code: "-",
      address: "부산 사상구 낙동대로 1356번길 42",
      phone: "051-327-1267",
      field: "SOLE",
      etc: "신발금형",
    },
    {
      name: "이노디어스",
      zip_code: "-",
      address: "부산 부산진구 백양대로 227 B1 이노디어스",
      phone: "070-7379-3793",
      field: "제조",
      etc: "제품디자인 등",
    },
    {
      name: "스케치비",
      zip_code: "-",
      address: "부산 사상구 사상로385번길 70, 3층(덕포동)",
      phone: "-",
      field: "제조",
      etc: "신발 디자인 전문업체",
    },
    {
      name: "에즈(AZ)",
      zip_code: "-",
      address: "부산 부산진구 신천대로 163 빅코치 빌딩 3층",
      phone: "051-897-0707",
      field: "제조",
      etc: "신발 편집샵(파도블)운영, 신발 솔 개발 등",
    },
    {
      name: "주식회사 스푸어",
      zip_code: "-",
      address: "부산 남구 신선로 365 부경대학교 산학협력관 418호",
      phone: "051-761-2016",
      field: "제조",
      etc: "신발 관리 용품",
    },
    {
      name: "하백디자인연구소",
      zip_code: "-",
      address: "부산 사상구 사상로 178-1 해은빌딩 4층",
      phone: "051-316-2782",
      field: "제조",
      etc: "신발 디자인",
    },
    {
      name: "천사의손",
      zip_code: "-",
      address: "부산 해운대구 좌동 순환로11 뉴대원빌딩 4층",
      phone: "051-746-9522",
      field: "제조",
      etc: "명품 핸드백 구두수선 전문",
    },
    {
      name: "시드 크레이티브(Seed creative)",
      zip_code: "-",
      address: "부산 강서구 유통단지 1로 41, 2층 206호(대저 2동, 부산티플렉스)",
      phone: "010-8510-6497",
      field: "제조",
      etc: "크리에이터, 신발 디자인",
    },
  ];

  let work_process_list = ["전체", "원단", "재단", "재봉", "솔", "제조"];
  let marker_colors = [
    "#ebe9e6",
    "#218c74",
    "#6c5ce7",
    "#ff7675",
    "#44bd32",
    "#e1b12c",
    "#273c75",
  ];
  useEffect(() => {
    const map: any = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(35.1531555, 128.9899664),
      zoom: 14,
      mapTypeControl: true,
    });
    setMap(map);

    function searchAddressToCoordinate(factory: FactoryInterface) {
      naver.maps.Service.geocode(
        {
          query: factory.address,
        },
        function (status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            if (!factory.address) {
              return alert("Geocode Error, Please check address");
            }
            return alert("Geocode Error, address:" + factory.address);
          }

          if (response.v2.meta.totalCount === 0) {
            return alert(`No result. ${factory.name} ${factory.address}`);
          }
          let { x, y } = response.v2.addresses[0];
          if (factory.field.includes("원단")) {
            setFabric((fabric) => [
              ...fabric,
              { ...factory, x: parseFloat(x), y: parseFloat(y) },
            ]);
          } else if (factory.field.includes("재단")) {
            setCut((cut) => [
              ...cut,
              { ...factory, x: parseFloat(x), y: parseFloat(y) },
            ]);
          } else if (factory.field.includes("재봉")) {
            setSewing((sewing) => [
              ...sewing,
              { ...factory, x: parseFloat(x), y: parseFloat(y) },
            ]);
          } else if (factory.field.includes("SOLE")) {
            setSole((sole) => [
              ...sole,
              { ...factory, x: parseFloat(x), y: parseFloat(y) },
            ]);
          } else if (factory.field.includes("제조")) {
            setManufacturing((manufacturing) => [
              ...manufacturing,
              { ...factory, x: parseFloat(x), y: parseFloat(y) },
            ]);
          } else {
          }
          setCoordinates((coordinates) => [
            ...coordinates,
            { ...factory, x: parseFloat(x), y: parseFloat(y) },
          ]);
        }
      );
    }

    function initGeocoder() {
      test_lists.forEach((test_list) => {
        searchAddressToCoordinate(test_list);
      });
    }
    naver.maps.onJSContentLoaded = initGeocoder;

    setLoading(false);
  }, []);

  useEffect(() => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers2.forEach((marker2) => {
      marker2.setMap(null);
    });
    function test(testlist: CoordinateInterface) {
      testlist.forEach((cordinate) => {
        let color = "";

        if (cordinate.field.includes(filter) || filter === "전체") {
          if (cordinate.field === "원단") {
            color = marker_colors[1];
          } else if (cordinate.field === "재단") {
            color = marker_colors[2];
          } else if (cordinate.field === "재봉") {
            color = marker_colors[3];
          } else if (cordinate.field === "SOLE") {
            color = marker_colors[4];
          } else if (cordinate.field === "제조") {
            color = marker_colors[5];
          } else {
            color = marker_colors[6];
          }
          let marker: any = new naver.maps.Marker({
            position: new naver.maps.LatLng(cordinate.y, cordinate.x),
            map: map,
            icon: {
              content: `<i style='font-size:1.7em;color:${color}' class='${cordinate.field} fa-solid fa-location-dot'></i>`,
            },
          });
          let marker2: any = null;
          naver.maps.Event.addListener(marker, "click", function (e) {
            if (marker2 != null) {
              marker2.setMap(null);
              marker2 = null;
            } else {
              marker2 = new naver.maps.Marker({
                position: new naver.maps.LatLng(cordinate.y, cordinate.x),
                map: map,
                icon: {
                  content: `
                    <div class=factory_info>
                    <div class=factory_info__title>
                        <span style='color:${color};' class=title__name>${cordinate.name}</span>
                        <span class=title__field>${cordinate.field}</span>
                    </div>
                    <div class=factory_info__body>
                        <span>주소: ${cordinate.address}</span>
                        <span>전화번호: ${cordinate.phone}</span>
                        <span>우편: ${cordinate.zip_code}</span>
                    </div>
                    </div>`,
                },
              });
              setMarker2((markers) => [...markers, marker2]);
            }
          });
          naver.maps.Event.addListener(marker, "mouseover", function (e) {
            // box-shadow: 0 0 10px #ffffff;
            marker.icon.content = `<i style='box-shadow: 0 0 10px #ffffff; font-size:3.7em;color:${color}' class='${cordinate.field} fa-solid fa-location-dot'></i>`;
            // marker.MarkerOptions = {
            //   position: new naver.maps.LatLng(cordinate.y, cordinate.x),
            //   map: map,
            //   icon: {
            //     content: `<i style='box-shadow: 0 0 10px #ffffff; font-size:3.7em;color:${color}' class='${cordinate.field} fa-solid fa-location-dot'></i>`,
            //   },
            // };
          });
          setMarker((markers) => [...markers, marker]);
        }
      });
    }
    if (filter === "원단") {
      setFactoriesF(fabric);
      test(fabric);
    } else if (filter === "재단") {
      setFactoriesF(cut);
      test(cut);
    } else if (filter === "재봉") {
      setFactoriesF(sewing);
      test(sewing);
    } else if (filter === "SOLE") {
      setFactoriesF(sole);
      test(sole);
    } else if (filter === "제조") {
      setFactoriesF(manufacturing);
      test(manufacturing);
    } else {
      setFactoriesF(coordinates);
      test(coordinates);
    }
  }, [filter]);
  return (
    <Container>
      <Header>
        <Navigation>
          <Logo>Logo</Logo>
          <NavItem>주문하기</NavItem>
          <NavItem>공장찾기</NavItem>
          <NavItem>리뷰확인</NavItem>
          <NavItem>파트너스</NavItem>
          <LoadMore>더보기</LoadMore>
        </Navigation>
        <SignForm>
          <SignItem>로그인</SignItem>|<SignItem>회원가입</SignItem>
          <Manufacturer>
            <span>제조공정 입점</span>
          </Manufacturer>
        </SignForm>
      </Header>
      <Article>
        <MarkFilterBox>
          {work_process_list.map((work_process, index) => (
            <FliterMenu onClick={onClick} key={index}>
              <FilterMenuDiv filterColor={marker_colors[index]}></FilterMenuDiv>
              <FilterMenuSpan>{work_process}</FilterMenuSpan>
            </FliterMenu>
          ))}
        </MarkFilterBox>
        <FactoryList>
          {factoriesF.map((coordinate, index) => (
            <FactoryListItem key={index}>
              <div className="factory_info__title">
                <span className="title__name">{coordinate.name}</span>
                <span className="title__field">{coordinate.field}</span>
              </div>
              <div className="factory_info__body">
                <span>etc: {coordinate.etc}</span>
                <span>주소: {coordinate.address}</span>
                <span>전화번호: {coordinate.phone}</span>
                <span>우편: {coordinate.zip_code}</span>
              </div>
            </FactoryListItem>
          ))}
        </FactoryList>
        <Map id="map"></Map>
      </Article>
    </Container>
  );
}

export default MapD;
