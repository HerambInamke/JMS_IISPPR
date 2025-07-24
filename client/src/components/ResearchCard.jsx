import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Download } from "lucide-react";
import { generateArticlePDF, downloadPDF } from "../utils/pdfExport";

const articleRoutes1 = {
  1: "/Bridging-Literacy-Gaps-in-India",
  2: "/Impact-Of-The-Maternity-Benefit-Act",
  3: "/The-Troubling-Rise-Of-Realism-Over-Institutionalism",
  4: "/Life-Cycle-Environmental-Impact-Assessment",
  5: "/Greenwashing-In-Corporate-Branding",
  6: "/Primary-Health-Care-And-Foreign-Policy",
  7: "/Projecting-Culture-Shaping-Perceptions",
  8: "/The-Intersection-Of-Women-Empowerment",
  9: "/Scripts-Symbols-and-Soft-Power-Tracing-Indias-Cultural-Diplomacy-in-Global-Affairs",
  10: "/Sovereignty-Strategy-and-Systemic-Strain",
  11: "/Evaluating-Policy-Gaps-And-Youth-Involvement",
  12: "/Multipolar-Worldmaking",
  13: "/Bridging-The-Education-Gap",
  14: "/India-US-Bilateral-Relations",
  15: "/Diplomacy-Beyond-Diplomats",
  16: "/From-Gram-Sabha-To-Eco-Swaraj",
  17: "/Impact-Of-Social-Protection-Policies",
};
const articleRoutes2 = {
  1: "/Rewiring-The-Engines-Of-Growth",
}

const ResearchCard = ({ articles, onDelete }) => {
  const [downloading, setDownloading] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const pdf = await generateArticlePDF(articles);

      const sanitizedTitle = articles.title
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "_")
        .substring(0, 50);

      const filename = `LDTPPR_Research_Articles_${sanitizedTitle}_${articles.id}.pdf`;
      downloadPDF(pdf, filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="group relative bg-white border border-accent-light rounded-xl p-6 shadow-sm hover:border-new-primary transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:scale-[1.015] flex flex-col gap-4 overflow-hidden">
      {/* animated border glow */}
      <div className="absolute inset-0 z-0 rounded-xl group-hover:ring-2 group-hover:ring-new-primary/30 transition-all duration-300 pointer-events-none" />

      {/* Top bar */}
      <div className="flex justify-between items-center relative z-10" style={{ color:'#703b5f'}}>
        <span className="text-sm font-medium">
          Serial {articles.id}
        </span>
        <span className="text-sm font-medium">
          Issue {articles.issue} · Volume {articles.volume}
        </span>
      </div>

      {/* Author + Status */}
      <div className="flex justify-between items-center relative z-10">
        <span className="text-new-primary px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(105, 49, 85, 0.13)'}}>
          {articles.authorAbbrev}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {articles.status}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-xl font-serif font-bold leading-tight relative z-10 transition duration-300 group-hover:text-primary" style={{ color:'#482742ff'}}>
        {articles.title}
      </h2>

      {/* Abstract */}
      <p className="text-new-primary text-sm text-justify relative z-10 border-l-4 mb-6 border-new-primary p-6 rounded-lg space-y-3" style={{ backgroundColor: 'rgba(105, 49, 85, 0.13)' }} >
        {articles.abstract}
      </p>

      {/* Keywords */}
      {articles.keywords?.length > 0 && (
        <div className="relative z-10">
          <h4 className="font-semibold text-new-primary mb-3 text-sm"><b>Keywords</b></h4>
          <div className="flex flex-wrap gap-2">
            {articles.keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-new-primary-sub text-new-primary text-xs rounded transition-all duration-200 hover:bg-new-primary hover:scale-105 hover:text-white"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-4 relative z-10">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-new-primary-dark text-white font-medium rounded hover:bg-new-primary-sub transition disabled:opacity-50 hover:text-new-primary"
        >
          <Download size={16} />
          {downloading ? "Downloading..." : "Download"}
        </button>

        {articles.issue==1 &&
        <Link to={articleRoutes1[articles.id]}>
          <button className="inline-flex items-center px-4 py-2 bg-new-primary-dark text-white font-medium rounded hover:bg-new-primary-sub transition disabled:opacity-50 hover:text-new-primary">
            Read More
          </button>
        </Link>}

        {articles.issue==2 &&
        <Link to={articleRoutes2[articles.id]}>
          <button className="inline-flex items-center px-4 py-2 bg-new-primary-dark text-white font-medium rounded hover:bg-new-primary-sub transition disabled:opacity-50 hover:text-new-primary">
            Read More
          </button>
        </Link>}

        {onDelete && isAdmin && (
          <button
            onClick={() => onDelete(articles.id)}
            className="text-xs text-red-600 hover:text-red-800 px-3 py-1 bg-red-50 border border-red-200 rounded transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ResearchCard;
