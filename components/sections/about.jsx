"use client";
import { T } from "../portfolio-provider";

const interests = [
  {
    icon: "bike",
    title: "about.bikeTitle",
    name: "On my bike",
    copy: "about.bike",
    text: "Getting outdoors and enjoying a bike ride.",
  },
  {
    icon: "music",
    title: "about.musicTitle",
    name: "With my guitar",
    copy: "about.music",
    text: "Playing guitar and making music with friends.",
  },
  {
    icon: "pin",
    title: "about.travelTitle",
    name: "Somewhere new",
    copy: "about.travel",
    text: "Exploring new places whenever I get the chance.",
  },
];

export function About() {
  return (
    <section
      className="section section-about"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="container">
        <div className="section-heading" data-reveal="true">
          <div>
            <p className="section-label">
              <span>01 /</span>
              <T id="about.label">ABOUT ME</T>
            </p>
            <h2 id="about-title">
              <T id="about.title1">Backend engineering.</T>
              <br />
              <span className="muted">
                <T id="about.title2">A product-wide perspective.</T>
              </span>
            </h2>
          </div>
        </div>

        <div className="about-grid">
          <div className="about-detail about-profile" data-reveal="true">
            <div className="about-card-heading">
              <svg className="icon" aria-hidden="true">
                <use href="/assets/img/icons.svg#code" />
              </svg>
              <h3>
                <T id="about.profileTitle">My professional profile</T>
              </h3>
            </div>
            <p className="about-profile-intro">
              <T id="about.bio">
                I'm a Computer Engineer, graduated from Universidad Nacional de
                La Plata, Argentina, and a semi-senior software engineer
                specializing in backend development.
              </T>
            </p>
            <dl className="about-focus">
              <div>
                <dt>
                  <T id="about.systemsTitle">Systems</T>
                </dt>
                <dd>
                  <T id="about.systems">
                    Backend with Java, MySQL, microservices, and event-driven
                    architecture, from small applications to enterprise systems.
                  </T>
                </dd>
              </div>
              <div>
                <dt>
                  <T id="about.productTitle">Product & data</T>
                </dt>
                <dd>
                  <T id="about.product">
                    Data analysis and engineering to understand the product
                    beyond individual services.
                  </T>
                </dd>
              </div>
              <div>
                <dt>
                  <T id="about.learningTitle">Continuous learning</T>
                </dt>
                <dd>
                  <T id="about.learningShort">
                    Exploring tools and practices that improve how I develop and
                    automate software.
                  </T>
                </dd>
              </div>
            </dl>
          </div>

          <aside
            className="about-personal"
            aria-labelledby="personal-title"
            data-reveal="true"
          >
            <p className="mono about-personal-label">
              <T id="about.personalLabel">THE OTHER SIDE OF ME</T>
            </p>
            <h3 id="personal-title">
              <T id="about.personalTitle">Outside of work</T>
            </h3>
            <p className="about-personal-intro">
              <T id="about.personalIntro">
                Away from the screen, I make time for the outdoors, music, and
                exploring.
              </T>
            </p>
            <ul className="interest-list">
              {interests.map((item) => (
                <li key={item.icon}>
                  <span className="interest-icon">
                    <svg className="icon" aria-hidden="true">
                      <use href={`/assets/img/icons.svg#${item.icon}`} />
                    </svg>
                  </span>
                  <div>
                    <h4>
                      <T id={item.title}>{item.name}</T>
                    </h4>
                    <p>
                      <T id={item.copy}>{item.text}</T>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <div className="about-footer" data-reveal="true">
          <dl className="profile-facts">
            <div>
              <dt>
                <T id="about.based">BASED IN</T>
              </dt>
              <dd>La Plata, Buenos Aires</dd>
            </div>
            <div>
              <dt>
                <T id="about.education">EDUCATION</T>
              </dt>
              <dd>
                <T id="about.degree">Computer Engineer · UNLP</T>
              </dd>
            </div>
          </dl>
          <a
            className="text-link"
            href="https://www.linkedin.com/in/leandroeguia/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <T id="about.linkedin">My full profile on LinkedIn</T>
            <svg className="icon small-icon" aria-hidden="true">
              <use href="/assets/img/icons.svg#arrow-up-right" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
