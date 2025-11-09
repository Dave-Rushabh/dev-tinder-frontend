const ProfileCard = ({ profileData }) => {
  const {
    firstName,
    lastName,
    age,
    gender,
    photoURL,
    about,
    skills = [],
  } = profileData;

  return (
    <div className="card w-full max-w-sm bg-base-100 text-neutral-content shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 hover:border-accent cursor-pointer min-h-80">
      <figure>
        <img src={photoURL} alt={`${firstName} ${lastName}`} />
      </figure>

      <div className="card-body items-center text-center">
        <h2 className="card-title text-accent text-2xl font-bold">
          {firstName} {lastName}
        </h2>

        <p className="text-sm text-info">{`${age} years • ${gender}`}</p>

        <p className="text-gray-300 mt-2 line-clamp-3">{about}</p>

        {skills?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {skills.slice(0, 6).map((skill, idx) => (
              <span
                key={idx}
                className="badge badge-accent badge-outline text-sm px-3 py-2"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between gap-8 w-full mt-8">
          <button className="btn btn-outline btn-error">Reject</button>
          <button className="btn btn-outline btn-accent">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
