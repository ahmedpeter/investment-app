import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MoneyBag from "../../Assets/imgs/git2.png";
import AboutVid from "../../Assets/vid/about.mp4";
import GitLogo from "../../Assets/imgs/Git-logo.png";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import Ticker from "../widgets/Ticker";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Landing = () => {
  useEffect(() => {}, []);

  return (
    <div className="parent">
      <div className="top">
        <div className="logo-landing">
          <img src={GitLogo} className="w-70" alt="Dividend Global" />
        </div>
        <div className="nav">
          <ul>
            <li>Home</li>

            <li>About</li>
            <li>FAQ</li>
            <li>Contact</li>
            <li>Open Account</li>
            <li>
              <Link to="/login">
                <button className="btn tetiary">Login</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="front__store">
        <div className="left__store">
          <h3>
            <div class="scroller">
              <span>
                Bitcoin
                <br />
                Forex
                <br />
                Crypto
                <br />
              </span>
            </div>
            Trading Investment with{" "}
            <span className="text-pink">Dividend Global</span>
          </h3>
          <p className="trucn">
            Global Investment Trading is a group company of over 1500 strong
            professionals and 2 mega data center’s parent Cyfuture with
            experience of over 5+ years in Data Center Industry serving over
            140,000 Customers.
          </p>

          <button className="btn ml-0">Know More </button>
          <Link to="/login">
            <button className="btn tetiary">Get Started</button>
          </Link>

          <p className="font-14 bold mtb-15">
            Trusted by More Than 11,000+ Users
          </p>
          <div className="count__value">
            <div className="count b-r">
              <h1 className="value">11K</h1>
              <p className="font-9"> Total Investors</p>
            </div>
            <div className="count b-r">
              <h1 className="value">21M</h1>
              <p className="font-9"> Total Withdrawal</p>
            </div>
            <div className="count">
              <h1 className="value">63M</h1>
              <p className="font-9"> Total Deposit</p>
            </div>
          </div>
        </div>
      </div>
      <div class="news__ticker header__content-inner">
        <Ticker />
      </div>
      <section className="row primary__color threat">
        <div className="about">
          <div className="about__left">
            <div class="about-thumb">
              <div class="about-thumb-inner">
                <img src={MoneyBag} width="auto" height="400" alt="BitCoin" />
                <div class="about-thumb-line about-thumb-line-one"></div>
                <div class="about-thumb-line about-thumb-line-two"></div>
              </div>
            </div>
          </div>
          <div className="about__right">
            <h3 className="calm">
              Innovations present an opportunity...
              <span style={{ color: "white" }}>Not a Threat</span>
            </h3>
            {/* <h2 className="mb-md ">Innovations present an opportunity...</h2>  */}
            <p className="font-13 lh-2">
              GIT Crypto is a platform for the future of funding that powering
              dat for the new equity blockchain. Trade with us to enjoy
              better-than-market conditions and a friction-free online trading
              experience: free demo account, instant withdrawals, 0% commission,
              no overnight fees, stable spreads, ultra-fast execution.
            </p>

            <p className="font-13 lh-2">
              Subject to the limitations set forth in this agreement, the
              purpose of the Partnership are to engage in the business of
              International trade of Crude, Gold, bulk commodities in the form
              of import and export from Dubai and China
            </p>
            <button className="btn tetiary">Learn More</button>
          </div>
        </div>
      </section>

      <div class="section_title" style={{ height: "25px" }}>
        <h3 className="text-black">
          Quick Bitcoin <span style={{ color: "black" }}>Investment</span>
        </h3>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its <br />
          layout. The point of using Lorem Ipsum.
        </p>
      </div>

      <section className="row">
        <div className="about">
          <div className="about__right">
            <p className="mb-md bold">Why Investment is so Important</p>
            <p className="font-13 lh-2 mb-md">
              Unlike paper money, Bitcoin and other cryptocurrencies are
              produced mathematically and held digitally. The people who
              voluntarily offer their computing power to secure these
              cryptocurrency networks are called miners. Cryptocurrencies don’t
              have a central government or other so-called ‘middlemen’ that
              decide about the future of the system. – They are in fact digital,
              borderless democracies in which miners vote with their computing
              power to reach order and consensus
            </p>
            <div className="row al-base">
              <div className="p-5">
                <p className="mb-md bold">Contributing to the Ecosystem</p>

                <p className="font-13 lh-2">
                  we are actively contributing to the cryptocurrency ecosystem,
                  from launching awareness campaigns to releasing open-source
                  investment software. Your investment outputs will be added to
                  your account daily and automatically
                </p>
              </div>
              <div>
                <p className="mb-md bold">Highly Experienced</p>

                <p className="font-13 lh-2">
                  We are building investment data centers around the world that
                  are able to support 6 investment algorithms for 10+ different
                  cryptocurrencies. If that’s not enough, we’d be happy to also
                  support the ones you want to mine!
                </p>
              </div>
            </div>

            {/* <button className="btn tetiary">Learn More</button> */}
          </div>
          <div className="about__left max-50">
            <video
              src={AboutVid}
              width="auto"
              height="400"
              type="video/mp4"
              controls
            />
          </div>
        </div>
      </section>

      <section className="image-container get-started">
        <div className="bannerSection">
          <div class="section_title">
            <h3>
              How to Get <span style={{ color: "white" }}>Started</span>
            </h3>
            <p style={{ color: "#ffffff" }}>
              Innovative Payment Network. Simple & Secure Access to the New Kind
              of Money
            </p>
          </div>
          {/* <section className="row space-around"> */}

          <div className="how">
            <div class="start-step">
              <AccessibilityNewIcon className="step-icon fs-110" />
              <div class="start-step-info">
                <div class="step-name">
                  <span>Create Account</span>
                </div>
                <div class="step-text">
                  <span>
                    Our goal is to simplify investing so that anyone can be an
                    investor. With this in mind, we hand-pick the investments we
                    offer on our platform. Simple Process to Start. Create and
                    account <strong>Now!</strong>
                  </span>
                </div>
              </div>
            </div>
            <div class="start-step">
              <MonetizationOnIcon className="step-icon fs-110" />
              <div class="start-step-info">
                <div class="step-name">
                  <span>Buy Investment</span>
                </div>
                <div class="step-text">
                  <span>
                    Investment platform where you can earn on the currency of
                    the future. The simple way to grow your money like the
                    world’s most sophisticated investors. Review the plans and
                    start investing. <strong>Its hassle free!</strong>
                  </span>
                </div>
              </div>
            </div>
            <div class="start-step">
              <CreditCardIcon className="step-icon fs-110" />
              <div class="start-step-info">
                <div class="step-name">
                  <span>Get Profit</span>
                </div>
                <div class="step-text">
                  <span>
                    Your total income directly depends on the amount you invest,
                    so the more you contribute, the more you can earn.{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* </section> */}

      <section className="rowspace-around m-auto m-t-xl faq">
        <div className="left_section"></div>
        <div className="testimonial">
          <blockquote>
            <h6>RISK IS THE SYNONYM FOR INNOVATION</h6>
            <q>
              Bitcoin is a new method to deal with money and one of the most
              important inventions in the entire history of evolution. Send and
              receive money from anywhere to anyone.
            </q>
          </blockquote>
        </div>
        <div className="right_section"></div>
      </section>

      <div class="main_footer">
        <div class="container bg_grey">
          <div class="bottom_space">
            <div class="col-sm-3 col-md-3" style={{ width: "350px" }}>
              <div class="widget-contact">
                <h3 class="footer-title">Our Company</h3>
                <p style={{ lineHeight: "2em" }}>
                  GIT Crypto is a platform for the future of funding that
                  powering dat for the new equity blockchain. Trade with us to
                  enjoy better-than-market conditions and a friction-free online
                  trading experience: free demo account, instant withdrawals, 0%
                  commission, no overnight fees, stable spreads, ultra-fast
                  execution.
                </p>
              </div>
            </div>
            <div class="col-sm-5 col-md-4 col-md-offset-1">
              <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 mr-60">
                  <div class="footer-box">
                    <h3 class="footer-title">Quick Guide</h3>
                    <ul class="footer-list">
                      <li>
                        <a href="#">
                          <ChevronRightIcon /> <span>Customer Support</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <ChevronRightIcon /> <span>Help center</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <ChevronRightIcon /> <span>Fees &amp; Limits</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <ChevronRightIcon /> <span>Referral Program</span>
                        </a>
                      </li>
                      {/* <li><a href="#">About Us</a></li> */}
                      <li>
                        <a href="#">
                          <ChevronRightIcon /> <span>24/7 Support</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6">
                  <div class="footer-box">
                    <h3 class="footer-title">Service</h3>
                    <ul class="footer-list">
                      <li>
                        <a href="about.html">
                          <ChevronRightIcon /> <span>About Us</span>
                        </a>
                      </li>
                      <li>
                        <a href="service.html">
                          <ChevronRightIcon /> <span>Service</span>
                        </a>
                      </li>
                      <li>
                        <a href="exchange.html">
                          <ChevronRightIcon /> <span>Exchange Bitcoin</span>
                        </a>
                      </li>
                      <li>
                        <a href="blog.html">
                          <ChevronRightIcon /> <span>Blog news</span>
                        </a>
                      </li>
                      {/* <li><a href="#">Our Team Member</a></li> */}
                      <li>
                        <a href="#">
                          <ChevronRightIcon /> <span>Roadmap Bitcoin</span>
                        </a>
                      </li>
                      {/* <li><a href="contact.html">Contact us</a></li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-3 col-md-3">
              <div class="widget-contact">
                <h3 class="footer-title">Contact Us</h3>
                <ul class="list-icon" style={{ lineHeight: "2em" }}>
                  <li>
                    <i class="fa fa-map-marker"></i> 1355 Market Street, Suite
                    900
                    <br />
                    San Francisco, CA 94103
                  </li>
                  <li>
                    <i class="fa fa-phone"></i> (123) 456-7890{" "}
                  </li>
                  <li>
                    <i class="fa fa-envelope"></i>{" "}
                    <a href="mailto:support@globaltrade.com">
                      support@globaltrade.com
                    </a>
                  </li>
                  <li>
                    <br />
                    <i class="fa fa-clock-o"></i>Monday - Friday:{" "}
                    <strong>08:00 - 22:00</strong>
                    <br />
                    Saturday, Sunday: <strong>Closed</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="row rights primary__color mt-0">
        {/* <p>Dividend Global &copy;{new Date().getFullYear()}. All Rights Reserved.</p> */}
      </section>
    </div>
  );
};

export default Landing;
