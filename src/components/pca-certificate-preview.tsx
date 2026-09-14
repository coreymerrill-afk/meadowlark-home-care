import {
  PCA_CERTIFICATE_AGENCY,
  PCA_CERTIFICATE_TITLE,
  formatCertificateDate,
  pcaCertificatePrintStyleVars,
  renderCertificateExplanation,
} from "@/lib/pca-certificate";

export type PcaCertificatePreviewProps = {
  employeeName: string;
  certificationDate: string;
  supervisorName: string;
  explanation: string;
  signatureDataUrl: string;
};

export function PcaCertificatePreview({
  employeeName,
  certificationDate,
  supervisorName,
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

  return (
    <div className="pca-print-sheet" style={pcaCertificatePrintStyleVars()}>
      <article className="pca-print-block flex flex-col items-center overflow-hidden px-[0.42in] py-[0.38in] text-center text-[#1d2a2e]">
        <p className="font-heading text-[11pt] tracking-[0.22em] text-[#003441] uppercase">
          {PCA_CERTIFICATE_AGENCY}
        </p>
        <p className="mt-[0.18in] font-heading text-[10pt] font-medium tracking-[0.28em] text-[#6b6256] uppercase">
          Certificate of recognition
        </p>
        <h2 className="mt-[0.12in] font-heading text-[22pt] leading-tight text-[#003441]">
          {PCA_CERTIFICATE_TITLE}
        </h2>
        <div
          className="mt-[0.2in] h-px w-[2.1in] bg-[#c4a35a]"
          aria-hidden="true"
        />
        <p className="mt-[0.22in] text-[9.5pt] tracking-[0.16em] text-[#6b6256] uppercase">
          Presented to
        </p>
        <p className="mt-[0.08in] font-heading text-[26pt] leading-tight text-[#003441]">
          {displayName}
        </p>
        <p className="mt-[0.16in] text-[11pt] text-[#3a4a4f]">
          Date of certification · {displayDate}
        </p>
        <p className="mt-[0.22in] min-h-0 max-w-[4.7in] flex-1 overflow-hidden text-left text-[11pt] leading-[1.45] text-[#2b383c]">
          {displayExplanation}
        </p>
        <div className="mt-auto flex w-full max-w-[3.6in] flex-col items-center pt-[0.28in]">
          <div className="flex h-[0.7in] w-full items-end justify-center">
            {signatureDataUrl ? (
              // Signature is a user-drawn canvas export, not a remote photo.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={signatureDataUrl}
                alt=""
                className="max-h-[0.68in] max-w-[3.2in] object-contain"
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
          <p className="mt-[0.18in] text-[8.5pt] tracking-[0.08em] text-[#6b6256]">
            {PCA_CERTIFICATE_AGENCY} · Montana
          </p>
        </div>
      </article>
    </div>
  );
}
