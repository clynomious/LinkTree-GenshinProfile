import React, { useEffect, useState } from "react";
import style from "./Profile.module.css";
import axios from "axios";
import { FaCopy } from "react-icons/fa";

function Profile() {
  const [data, setData] = useState("");
  const [icon, setIcon] = useState("");
  const [bg, setBg] = useState("");

  useEffect(() => {
    axios
      .get("https://encly-api-production.up.railway.app/api/profile/857067560")
      .then((response) => {
        setData(response.data);
        setIcon(response.data.profilePicture.icon);
        setBg(response.data.nameCard.banner);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const BgCard = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText("857067560");
    setIsCopied(true);

    // Mengembalikan teks "Copied" menjadi "Copy" setelah 2 detik
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div>
      <div className={style.card} style={BgCard}>
        <img src={icon} alt="Cly" className={style.profileImg} />
        <div className={style.uid}>
          <div className={style.uidNum}>UID: 857067560</div>
        </div>
        <div className={style.copy}>
          <button
            className={style.copyButton}
            onClick={handleCopyClick}
          >
            <FaCopy /> {isCopied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className={style.name}>{data.nickname} </div>
        <div className={style.sign}>{data.signature}</div>
        <div className={style.ar}>
          <div className={style.arText}>
            Adventure Rank
            <span className={style.arNum}>{data.level}</span>
          </div>
        </div>
        <div className={style.wl}>
          <div className={style.wlText}>
            Level Dunia
            <span className={style.wlNum}>{data.worldLevel}</span>
          </div>
        </div>
        <div className={style.pamer}>
          <img
            src="../assets/achievment.jpg"
            alt="Achievement"
            className={style.achiev}
          />
          <div className={style.achievText}>Achievement</div>
          <div className={style.achievNum}>{data.achievements}</div>
          <img
            src="../assets/spiral.jpg"
            alt="Spiral Abyss"
            className={style.spiral}
          />
          <div className={style.spiralText}>Spiral Abyss</div>
          <div className={style.spiralNum}>
            {data.abyssFloor}-{data.abyssLevel}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
