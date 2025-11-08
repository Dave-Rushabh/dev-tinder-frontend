import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col gap-16 custom-container">
      {/* 🌟 HERO SECTION */}
      <section className="hero bg-accent-content py-20 px-6 md:px-20 custom-container rounded-edges min-h-80">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Connect, Collaborate & <span>Code</span> Together!
            </h1>
            <p className="py-6 text-lg w-5/6 text-center text-base-content/80 font-bold">
              DevTinder is where developers meet like-minded coders, share
              ideas, and build amazing projects together. Swipe, match, and
              collaborate — professionally.
            </p>
            <div className="w-40">
              <Link to={`/auth/sign-up`} className="btn btn-neutral btn-wide">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* 💡 FEATURES SECTION */}
      <section className=" flex items-center justify-center gap-12 flex-col bg-accent-content py-20 px-6 md:px-20 text-center custom-container rounded-edges min-h-80">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Why Join DevTinder?
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className=" text-white card bg-neutral shadow-md hover:shadow-xl transition-all duration-300">
            <div className="card-body">
              <h3 className="card-title justify-center">🎯 Smart Matching</h3>
              <p>
                Find developers who share your skills, goals, or interests using
                our intelligent matching system.
              </p>
            </div>
          </div>

          <div className=" text-white card bg-neutral shadow-md hover:shadow-xl transition-all duration-300">
            <div className="card-body">
              <h3 className="card-title justify-center">🤝 Build Together</h3>
              <p>
                Connect instantly and start collaborating on exciting
                open-source or freelance projects.
              </p>
            </div>
          </div>

          <div className=" text-white card bg-neutral shadow-md hover:shadow-xl transition-all duration-300">
            <div className="card-body">
              <h3 className="card-title justify-center">
                🌍 Developer Community
              </h3>
              <p>
                Join a vibrant global network of coders, mentors, and innovators
                passionate about technology.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 💬 COMMUNITY CALL TO ACTION */}
      <section className="bg-accent-content min-h-80 flex flex-col items-center justify-center gap-8 py-20 text-center custom-container rounded-edges">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Find Your Dev Match?
        </h2>
        <p className="text-lg mb-8 px-6 md:px-0">
          Sign up today and start connecting with developers who inspire you.
        </p>
        <Link to={`/auth/sign-up`} className="btn btn-neutral btn-wide">
          Join Now
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
