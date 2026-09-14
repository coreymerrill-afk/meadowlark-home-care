import {
  PCA_CERTIFICATE_AGENCY,
  PCA_CERTIFICATE_PROGRAM,
  PCA_CERTIFICATE_TITLE,
  formatCertificateDate,
  pcaCertificatePathwayLine,
  pcaCertificatePrintStyleVars,
  renderCertificateExplanation,
  type PcaCertificatePathway,
} from "@/lib/pca-certificate";

export type PcaCertificatePreviewProps = {
  employeeName: string;
  certificationDate: string;
  supervisorName: string;
  pathway: PcaCertificatePathway;
  explanation: string;
  signatureDataUrl: string;
};

export function PcaCertificatePreview({
  employeeName,
  certificationDate,
  supervisorName,
  pathway,
  explanation,
  signatureDataUrl,
}: PcaCertificatePreviewProps) {
  const displayName = employeeName.trim() || "Employee name";
  const displayDate =
    formatCertificateDate(certificationDate) || "Date of certification";
  const displaySupervisor = supervisorName.trim() || "Nurse supervisor";
  const displayExplanation = renderCertificateExplanation(
    explanation,
    employeeName
  );
  const pathwayLine = pcaCertificatePathwayLine(pathway);

  return (
    <div className="pca-print-sheet" style={pcaCertificatePrintStyleVars()}>
      <article className="pca-print-block flex flex-col items-center overflow-hidden px-[0.55in] py-[0.32in] text-center text-[#1d2a2e]">
        <p className="font-heading text-[11pt] tracking-[0.28em] text-[#003441] uppercase">
          {PCA_CERTIFICATE_AGENCY}
        </p>
        <p className="mt-[0.12in] font-heading text-[10pt] font-medium tracking-[0.32em] text-[#6b6256] uppercase">
          Certificate of recognition
        </p>
        <h2 className="mt-[0.08in] font-heading text-[26pt] leading-tight text-[#003441]">
          {PCA_CERTIFICATE_TITLE}
        </h2>
        <p className="mt-[0.04in] text-[11pt] tracking-[0.08em] text-[#3a4a4f]">
          {PCA_CERTIFICATE_PROGRAM}
        </p>
        <div
          className="mt-[0.16in] h-px w-[2.6in] bg-[#c4a35a]"
          aria-hidden="true"
        />
        <p className="mt-[0.16in] text-[9.5pt] tracking-[0.18em] text-[#6b6256] uppercase">
          Presented to
        </p>
        <p className="mt-[0.04in] font-heading text-[30pt] leading-tight text-[#003441]">
          {displayName}
        </p>
        <p className="mt-[0.14in] max-w-[8.2in] font-heading text-[13pt] leading-snug text-[#003441]">
          {pathwayLine}
        </p>
        <p className="mt-[0.14in] min-h-0 max-w-[8.2in] flex-1 overflow-hidden text-[11.5pt] leading-[1.45] text-[#2b383c]">
          {displayExplanation}
        </p>
        <div className="mt-auto grid w-full max-w-[8.2in] grid-cols-2 gap-[0.7in] pt-[0.2in]">
          <div className="flex flex-col items-center">
            <div className="flex h-[0.55in] w-full items-end justify-center" />
            <div className="h-px w-full bg-[#1d2a2e]" aria-hidden="true" />
            <p className="mt-[0.06in] text-[9pt] tracking-[0.14em] text-[#6b6256] uppercase">
              Date of certification
            </p>
            <p className="mt-[0.04in] font-heading text-[12pt] text-[#003441]">
              {displayDate}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-[0.55in] w-full items-end justify-center">
              {signatureDataUrl ? (
                // Signature is a user-drawn canvas export, not a remote photo.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={signatureDataUrl}
                  alt=""
                  className="max-h-[0.52in] max-w-full object-contain"
                />
              ) : null}
            </div>
            <div className="h-px w-full bg-[#1d2a2e]" aria-hidden="true" />
            <p className="mt-[0.06in] text-[9pt] tracking-[0.14em] text-[#6b6256] uppercase">
              Nurse supervisor
            </p>
            <p className="mt-[0.04in] font-heading text-[12pt] text-[#003441]">
              {displaySupervisor}
            </p>
          </div>
        </div>
        <p className="mt-[0.14in] text-[8.5pt] tracking-[0.1em] text-[#6b6256]">
          {PCA_CERTIFICATE_AGENCY} · Montana CFC
        </p>
      </article>
    </div>
  );
}
