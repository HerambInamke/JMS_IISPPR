import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateIssuePDF = async (issue, publisher, editorialBoard) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (2 * margin);
  
  let yPosition = margin;
  const lineHeight = 7;
  const titleHeight = 12;

  // Cover Page
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(44, 62, 80);
  pdf.text('Law, Diplomacy, Technology &', margin, yPosition);
  yPosition += titleHeight;
  pdf.text('Public Policy Review', margin, yPosition);
  yPosition += titleHeight + 10;

  // ISSN Tab/Section
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(44, 62, 80);
  pdf.text('ISSN (Print/Online): Application in process (ID: IDS70965, expected within 6 months)', margin, yPosition);
  yPosition += lineHeight + 5;

  // Issue Info
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Volume ${issue.volume} - ${issue.month} ${issue.year}`, margin, yPosition);
  yPosition += titleHeight + 15;

  // Publisher Info
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Publisher Information:', margin, yPosition);
  yPosition += lineHeight;
  pdf.setFontSize(10);
  pdf.text(publisher.name, margin, yPosition);
  yPosition += lineHeight;
  pdf.text(publisher.organization, margin, yPosition);
  yPosition += lineHeight;
  pdf.text(`${publisher.address.street}`, margin, yPosition);
  yPosition += lineHeight;
  pdf.text(`${publisher.address.city}, ${publisher.address.state} ${publisher.address.postalCode}`, margin, yPosition);
  yPosition += lineHeight;
  pdf.text(publisher.address.country, margin, yPosition);
  yPosition += lineHeight + 5;

  // Contact Info
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Contact Information:', margin, yPosition);
  yPosition += lineHeight;
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Email: ${publisher.contact.email}`, margin, yPosition);
  yPosition += lineHeight;
  pdf.text(`Phone: ${publisher.contact.phone}`, margin, yPosition);
  yPosition += lineHeight;
  pdf.text(`Website: ${publisher.contact.website}`, margin, yPosition);
  yPosition += lineHeight + 10;

  // Table of Contents
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Table of Contents', margin, yPosition);
  yPosition += lineHeight + 5;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  issue.articles.forEach((article, index) => {
    pdf.text(`${index + 1}. ${article.title}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`   By ${article.author}`, margin + 5, yPosition);
    yPosition += lineHeight;
  });

  yPosition += 10;

  // Editorial Board
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Editorial Board', margin, yPosition);
  yPosition += lineHeight + 5;

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  editorialBoard.forEach((member, index) => {
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = margin;
    }
    
    pdf.setFont('helvetica', 'bold');
    pdf.text(member.name, margin, yPosition);
    yPosition += lineHeight - 2;
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${member.designation}, ${member.department}`, margin, yPosition);
    yPosition += lineHeight - 2;
    pdf.text(member.institution, margin, yPosition);
    yPosition += lineHeight - 2;
    pdf.text(`Email: ${member.email}`, margin, yPosition);
    yPosition += lineHeight - 2;
    pdf.text(`Phone: ${member.phone}`, margin, yPosition);
    yPosition += lineHeight;
  });

  // Articles
  issue.articles.forEach((article, index) => {
    pdf.addPage();
    yPosition = margin;

    // Article Title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    const titleLines = pdf.splitTextToSize(article.title, contentWidth);
    titleLines.forEach(line => {
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
    yPosition += 5;

    // Author
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(100, 100, 100);
    pdf.text(`By ${article.author}`, margin, yPosition);
    yPosition += lineHeight + 10;

    // Abstract
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    pdf.text('Abstract:', margin, yPosition);
    yPosition += lineHeight;
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(60, 60, 60);
    const abstractLines = pdf.splitTextToSize(article.abstract, contentWidth);
    abstractLines.forEach(line => {
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight - 1;
    });
    yPosition += 10;

    // Keywords
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    pdf.text('Keywords:', margin, yPosition);
    yPosition += lineHeight;
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(60, 60, 60);
    const keywordsText = article.keywords.join(', ');
    const keywordLines = pdf.splitTextToSize(keywordsText, contentWidth);
    keywordLines.forEach(line => {
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight - 1;
    });
    yPosition += 10;

    // Author Bio
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    pdf.text('Author Biography:', margin, yPosition);
    yPosition += lineHeight;
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(60, 60, 60);
    const bioLines = pdf.splitTextToSize(article.authorBio, contentWidth);
    bioLines.forEach(line => {
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight - 1;
    });
    yPosition += 10;

    // References
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    pdf.text('References:', margin, yPosition);
    yPosition += lineHeight;
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(60, 60, 60);
    article.references.forEach((ref, refIndex) => {
      const refLines = pdf.splitTextToSize(`${refIndex + 1}. ${ref}`, contentWidth);
      refLines.forEach(line => {
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight - 1;
      });
      yPosition += 2;
    });
    yPosition += 10;

    // Declarations
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    pdf.text('Declarations:', margin, yPosition);
    yPosition += lineHeight;
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(60, 60, 60);
    
    const declarations = [
      { name: 'Ethics Declaration', value: article.ethicsDeclaration },
      { name: 'Plagiarism Declaration', value: article.plagiarismDeclaration },
      { name: 'Peer Reviewed', value: article.peerReviewed },
      { name: 'Copy Edited', value: article.copyEdited }
    ];

    declarations.forEach(decl => {
      const status = decl.value ? '✓' : '✗';
      const color = decl.value ? [34, 139, 34] : [220, 20, 60];
      pdf.setTextColor(...color);
      pdf.text(`${status} ${decl.name}`, margin, yPosition);
      yPosition += lineHeight - 1;
    });

    yPosition += 5;
    pdf.setTextColor(60, 60, 60);
    pdf.text('AI Disclosure:', margin, yPosition);
    yPosition += lineHeight - 1;
    const aiLines = pdf.splitTextToSize(article.aiDisclosure, contentWidth);
    aiLines.forEach(line => {
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight - 1;
    });
  });

  return pdf;
};

export const downloadPDF = (pdf, filename) => {
  pdf.save(filename);
};

export const generateResearchPDF = async (articles) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (2 * margin);
  
  let yPosition = margin;
  const lineHeight = 7;
  const titleHeight = 12;

  // Cover Page
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(44, 62, 80);
  pdf.text('Research Articles', margin, yPosition);
  yPosition += titleHeight + 10;

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Law, Diplomacy, Technology & Public Policy Review', margin, yPosition);
  yPosition += lineHeight + 5;

  // ISSN Tab/Section
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(44, 62, 80);
  pdf.text('ISSN (Print/Online): Application in process (ID: IDS70965, expected within 6 months)', margin, yPosition);
  yPosition += lineHeight + 10;

  // Table of Contents
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Table of Contents', margin, yPosition);
  yPosition += lineHeight + 5;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  articles.forEach((article, index) => {
    pdf.text(`${index + 1}. ${article.title}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`   By ${article.author}`, margin + 5, yPosition);
    yPosition += lineHeight;
  });

  // Articles
  articles.forEach((article, index) => {
    pdf.addPage();
    yPosition = margin;

    // Article Title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    const titleLines = pdf.splitTextToSize(article.title, contentWidth);
    titleLines.forEach(line => {
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
    yPosition += 5;

    // Author
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(100, 100, 100);
    pdf.text(`By ${article.author}`, margin, yPosition);
    yPosition += lineHeight + 10;

    // Abstract
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    pdf.text('Abstract:', margin, yPosition);
    yPosition += lineHeight;
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(60, 60, 60);
    const abstractLines = pdf.splitTextToSize(article.abstract, contentWidth);
    abstractLines.forEach(line => {
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight - 1;
    });
    yPosition += 10;

    // Keywords
    if (article.keywords) {
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(44, 62, 80);
      pdf.text('Keywords:', margin, yPosition);
      yPosition += lineHeight;
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(60, 60, 60);
      const keywordsText = article.keywords.join(', ');
      const keywordLines = pdf.splitTextToSize(keywordsText, contentWidth);
      keywordLines.forEach(line => {
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight - 1;
      });
      yPosition += 10;
    }

    // Author Bio
    if (article.authorBio) {
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(44, 62, 80);
      pdf.text('Author Biography:', margin, yPosition);
      yPosition += lineHeight;
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(60, 60, 60);
      const bioLines = pdf.splitTextToSize(article.authorBio, contentWidth);
      bioLines.forEach(line => {
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight - 1;
      });
      yPosition += 10;
    }

    // References
    if (article.references) {
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(44, 62, 80);
      pdf.text('References:', margin, yPosition);
      yPosition += lineHeight;
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(60, 60, 60);
      article.references.forEach((ref, refIndex) => {
        const refLines = pdf.splitTextToSize(`${refIndex + 1}. ${ref}`, contentWidth);
        refLines.forEach(line => {
          pdf.text(line, margin, yPosition);
          yPosition += lineHeight - 1;
        });
        yPosition += 2;
      });
    }
  });

  return pdf;
}; 

export const generateArticlePDF = async (articles) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (2 * margin);
  
  let yPosition = margin;
  const lineHeight = 7;
  const titleHeight = 12;

  // Check if we need a new page
  const checkPageBreak = (requiredSpace) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
  };

  // Cover Page - Article Title
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(44, 62, 80);
  const titleLines = pdf.splitTextToSize(articles.title, contentWidth);
  titleLines.forEach(line => {
    pdf.text(line, margin, yPosition);
    yPosition += titleHeight;
  });
  yPosition += 15;

  // Author
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(100, 100, 100);
  checkPageBreak(lineHeight + 5);
  const authorLines = pdf.splitTextToSize(`${articles.author}`, contentWidth);
  authorLines.forEach(line => {
    pdf.text(line, margin, yPosition);
    yPosition += 8;
  });
  yPosition += lineHeight + 15;

  // Abstract
  if (articles.abstract) {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    checkPageBreak(lineHeight * 3);
    pdf.text('Abstract:', margin, yPosition);
    yPosition += lineHeight + 2;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(60, 60, 60);
    const abstractLines = pdf.splitTextToSize(articles.abstract, contentWidth);
    abstractLines.forEach(line => {
      checkPageBreak(lineHeight);
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight - 1;
    });
    yPosition += 15;
  }

  // Keywords
  if (articles.keywords && articles.keywords.length > 0) {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    checkPageBreak(lineHeight * 3);
    pdf.text('Keywords:', margin, yPosition);
    yPosition += lineHeight + 2;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(60, 60, 60);
    const keywordsText = articles.keywords.join(', ');
    const keywordLines = pdf.splitTextToSize(keywordsText, contentWidth);
    keywordLines.forEach(line => {
      checkPageBreak(lineHeight);
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight - 1;
    });
    yPosition += 15;
  }

  // Introduction
  if (articles.intro) {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    checkPageBreak(lineHeight * 3);
    pdf.text('Introduction:', margin, yPosition);
    yPosition += lineHeight + 5;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(60, 60, 60);
    articles.intro.forEach((intr, intrIndex) => {
      const intrLines = pdf.splitTextToSize(`${intr}`, contentWidth);
      intrLines.forEach(line => {
        checkPageBreak(lineHeight);
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight - 1;
      });
      yPosition += 3;
    });
    yPosition+=15
  }

  // Main Content Sections
if (articles.content && Array.isArray(articles.content)) {
  articles.content.forEach((section, sectionIndex) => {
    // Heading
    if (section.heading) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(44, 62, 80);
      const headingLines = pdf.splitTextToSize(`${section.heading}`, contentWidth);
      headingLines.forEach(line => {
        checkPageBreak(lineHeight);
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
      yPosition += 5;
    }

    // Paragraphs
    if (section.paragraphs && Array.isArray(section.paragraphs)) {
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(60, 60, 60);

      section.paragraphs.forEach(para => {
        const paraLines = pdf.splitTextToSize(para, contentWidth);
        paraLines.forEach(line => {
          checkPageBreak(lineHeight);
          pdf.text(line, margin, yPosition);
          yPosition += lineHeight - 1;
        });
        yPosition += 5; // space after paragraph
      });
    }
    yPosition += 8; // space after section
  });
}


  // Conclusion
  if (articles.conclusion) {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    checkPageBreak(lineHeight * 3);
    pdf.text('Conclusion:', margin, yPosition);
    yPosition += lineHeight + 5;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(60, 60, 60);
    articles.conclusion.forEach((con, conIndex) => {
      const conLines = pdf.splitTextToSize(`${con}`, contentWidth);
      conLines.forEach(line => {
        checkPageBreak(lineHeight);
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight - 1;
      });
      yPosition += 3;
    });
    yPosition+=15
  }

  // References
  if (articles.references && Array.isArray(articles.references)) {
  // Add References heading
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    checkPageBreak(lineHeight * 2);
    pdf.text('References:', margin, yPosition);
    yPosition += lineHeight + 5;

  // List references
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
  
    articles.references.forEach((ref, index) => {
    // Format reference text with number
      if (ref.heading){
        const refNumber = `${index + 1}. `;
        const refText = ref.heading;
    
    // Split and display reference text
        pdf.setTextColor(60, 60, 60);
        const textLines = pdf.splitTextToSize(refNumber +  refText, contentWidth);
        textLines.forEach(line => {
          checkPageBreak(lineHeight);
          pdf.text(line, margin, yPosition);
          yPosition += lineHeight - 1;
        });
      }
    // Split and display link (in blue)
      if (ref.links) {
        pdf.setTextColor(0, 0, 255); // Blue for links
        const linkText = `   ${ref.links}`;
        const linkLines = pdf.splitTextToSize(linkText, contentWidth);
        linkLines.forEach(line => {
          checkPageBreak(lineHeight);
          pdf.text(line, margin, yPosition);
          yPosition += lineHeight - 1;
        });
      }
      yPosition += 8; // Space between references
    });
  }
  
  return pdf;
};