const ArticlePage = ({
  id,
  issue,
  volume,
  title,
  author,
  abstract,
  intro,
  content,
  conclusion,
  references,
}) => {
  return (
    <div className="bg-primary-light min-h-screen py-10 px-4 sm:px-6 md:px-8">
      <div className="bg-white shadow-md rounded-xl max-w-6xl mx-auto p-5 sm:p-8">
        {/* Top bar */}
        <div className="flex justify-between items-center relative mb-6 z-10" style={{ color:'#703b5f'}}>
          <span className="text-base font-medium ">
            Serial {id}
          </span>
          <span className="text-base font-medium">
            Issue {issue} · Volume {volume}
          </span>
        </div>
        {/* <div className="max-w-4xl mx-auto p-6"> */}
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-2xl text-gray-700 mb-4 my-4">By - {author}</p>

        <h2 className="text-2xl font-semibold text-primary mb-2">Abstract</h2>
        <p className="mb-4 text-base leading-relaxed text-gray-800">
          {abstract}
        </p>

        {/* Intro */}
        {intro &&
        <h2 className="text-2xl font-semibold text-primary mb-2">
          Introduction
        </h2>
        }
        {intro?.map((para, index) => (
          <p
            key={index}
            className="mb-4 text-base leading-relaxed text-gray-800"
          >
            {para}
          </p>
        ))}

        {content?.map((section, index) => (
          <div key={index} className="mt-6">
            <h2 className="text-2xl font-semibold text-primary mb-5">
              {section.heading}
            </h2>
            {section.paragraphs?.map((para, pIndex) => (
              <p
                key={pIndex}
                className="mb-4 text-base text-gray-700 leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>
        ))}

        {/* Conclusion Section */}
        {conclusion && conclusion.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Conclusion
            </h2>

            {typeof conclusion[0] === "string"
              ? // If it's just array of paragraphs
                conclusion.map((para, index) => (
                  <p
                    key={index}
                    className="mb-4 text-base leading-relaxed text-gray-800"
                  >
                    {para}
                  </p>
                ))
              : // If it's an array of objects with heading and paragraphs
                conclusion.map((section, index) => (
                  <div key={index} className="mb-4">
                    {section.heading && (
                      <h3 className="text-xl font-semibold text-primary-dark mb-2">
                        {section.heading}
                      </h3>
                    )}
                    {section.paragraphs?.map((para, pIndex) => (
                      <p
                        key={pIndex}
                        className="mb-3 text-base leading-relaxed text-gray-800"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                ))}
          </div>
        )}

        {/* References */}
        {references && references.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-primary mb-4">
              References
            </h2>
            <ul className="list-disc list-inside space-y-3">
              {references.map((ref, index) => (
                <li
                  key={index}
                  className="text-sm text-blue-700 hover:underline"
                >
                  <a href={ref.links} target="_blank" rel="noopener noreferrer">
                    {ref.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
