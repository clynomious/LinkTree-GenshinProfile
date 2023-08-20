import React, { useCallback } from "react";
import "./Home.css";
import Profile from "../components/Profile";
import Card from "../components/Card";
import { BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";
import { FaFacebookSquare, FaTiktok } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import config from "./config.json";

function Home() {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
  }, []);
  return (
    <div className="bg">
      <div className="card">
        <div className="card-body">
          <div className="profile">
            <img
              src="./assets/profile.jpg"
              alt="profile"
              className="profileImg"
            />
            <h1 className="name">Fajar</h1>
            <div className="sign">
              Just a{"  "}
              <span className="typewriter">
                <Typewriter
                  options={{
                    strings: ["Random Guy", "Gamers", "Ordinary People"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </div>
          </div>
          <Profile />
          <Card />
          <div className="mt-16">
            <a href="https://instagram.com/fajar.cly" className="social">
              <BsInstagram />
              Instagram
            </a>
          </div>
          <div className="mt-16">
            <a href="https://fb.com/fajar.clyy" className="social">
              <FaFacebookSquare />
              Facebook
            </a>
          </div>
          <div className="mt-16">
            <a href="https://tiktok.com/@fajar.cly" className="social">
              <FaTiktok />
              TikTok
            </a>
          </div>
          <div className="mt-16">
            <a href="https://twitter.com/siFajar277" className="social">
              <BsTwitter />
              Twitter
            </a>
          </div>
          <div className="mt-16">
            <a href="https://github.com/FajarCly" className="social">
              <BsGithub />
              Github
            </a>
          </div>
        </div>
      </div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        style={{ position: "absolute", zIndex: -100 }}
        options={config}
      />
    </div>
  );
}

export default Home;
