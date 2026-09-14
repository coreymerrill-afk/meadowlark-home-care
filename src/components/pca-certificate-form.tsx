"use client";

import { useEffect, useId, useState } from "react";

import { PcaCertificatePreview } from "@/components/pca-certificate-preview";
import { PcaCertificateSignaturePad } from "@/components/pca-certificate-signature-pad";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DEFAULT_PCA_CERTIFICATE_EXPLANATION,
  PCA_CERTIFICATE_PRINT,
  todayIsoDate,
  validatePcaCertificate,
  type PcaCertificateFieldErrors,
} from "@/lib/pca-certificate";

import "@/app/staff/forms/pca-certificate/pca-certificate.css";

export function PcaCertificateForm({
  defaultSupervisorName = "",
}: {
  defaultSupervisorName?: string;
}) {
  const employeeId = useId();
  const dateId = useId();
  const supervisorId = useId();
  const explanationId = useId();
  const [employeeName, setEmployeeName] = useState("");
  const [certificationDate, setCertificationDate] = useState(todayIsoDate);
  const [supervisorName, setSupervisorName] = useState(defaultSupervisorName);
  const [explanation, setExplanation] = useState(
    DEFAULT_PCA_CERTIFICATE_EXPLANATION
  );
  const [signatureDataUrl, setSignatureDataUrl] = useState("");
  const [fieldErrors, setFieldErrors] = useState<PcaCertificateFieldErrors>({});

  useEffect(() => {
    document.documentElement.dataset.pcaCertificatePrint = "";
    return () => {
      delete document.documentElement.dataset.pcaCertificatePrint;
    };
  }, []);

  function handlePrint() {
    const result = validatePcaCertificate({
      employeeName,
      certificationDate,
      supervisorName,
      explanation,
    });
    if (!result.ok) {
      setFieldErrors(result.fieldErrors);
      return;
    }
    setFieldErrors({});
    window.print();
  }

  return (
    <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(18rem,24rem)_minmax(0,1fr)] xl:items-start">
      <form
        className="pca-no-print space-y-5 rounded-[1.5rem] border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 sm:p-8"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          handlePrint();
        }}
      >
        <div className="space-y-2">
          <Label htmlFor={employeeId}>Employee name</Label>
          <Input
            id={employeeId}
            name="employeeName"
            required
            autoComplete="name"
            value={employeeName}
            onChange={(event) => setEmployeeName(event.target.value)}
            className="h-12 bg-card"
            aria-invalid={Boolean(fieldErrors.employeeName)}
          />
          {fieldErrors.employeeName ? (
            <p className="text-sm text-destructive" role="alert">
              {fieldErrors.employeeName}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor={dateId}>Date of certification</Label>
          <Input
            id={dateId}
            name="certificationDate"
            type="date"
            required
            value={certificationDate}
            onChange={(event) => setCertificationDate(event.target.value)}
            className="h-12 bg-card"
            aria-invalid={Boolean(fieldErrors.certificationDate)}
          />
          {fieldErrors.certificationDate ? (
            <p className="text-sm text-destructive" role="alert">
              {fieldErrors.certificationDate}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor={supervisorId}>Nurse supervisor name</Label>
          <Input
            id={supervisorId}
            name="supervisorName"
            required
            autoComplete="name"
            value={supervisorName}
            onChange={(event) => setSupervisorName(event.target.value)}
            className="h-12 bg-card"
            aria-invalid={Boolean(fieldErrors.supervisorName)}
          />
          {fieldErrors.supervisorName ? (
            <p className="text-sm text-destructive" role="alert">
              {fieldErrors.supervisorName}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor={explanationId}>Certificate explanation</Label>
          <Textarea
            id={explanationId}
            name="explanation"
            required
            rows={6}
            value={explanation}
            onChange={(event) => setExplanation(event.target.value)}
            className="bg-card text-base"
            aria-invalid={Boolean(fieldErrors.explanation)}
          />
          <p className="text-xs text-muted-foreground">
            Use {"{name}"} to insert the employee’s name. Keep this as home-care
            competency recognition — not hospice or skilled-nursing marketing.
          </p>
          {fieldErrors.explanation ? (
            <p className="text-sm text-destructive" role="alert">
              {fieldErrors.explanation}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label>Signature (optional)</Label>
          <PcaCertificateSignaturePad
            value={signatureDataUrl}
            onChange={setSignatureDataUrl}
          />
        </div>

        <Button
          type="submit"
          variant="cta"
          size="lg"
          className="h-12 rounded-full px-6 text-base"
        >
          Print certificate
        </Button>
      </form>

      <div>
        <p className="pca-no-print text-sm text-muted-foreground">
          Preview matches the print insert:{" "}
          {PCA_CERTIFICATE_PRINT.blockWidthIn}&quot; ×{" "}
          {PCA_CERTIFICATE_PRINT.blockHeightIn}&quot; centered on US Letter,
          with light dashed cut guides. Cut and paste inside the gold border
          (about {PCA_CERTIFICATE_PRINT.innerClearWidthIn}&quot; ×{" "}
          {PCA_CERTIFICATE_PRINT.innerClearHeightIn}&quot; clear).
        </p>
        <div className="pca-preview-frame mt-4 rounded-[1.25rem] p-4 ring-1 ring-foreground/10 sm:p-6">
          <PcaCertificatePreview
            employeeName={employeeName}
            certificationDate={certificationDate}
            supervisorName={supervisorName}
            explanation={explanation}
            signatureDataUrl={signatureDataUrl}
          />
        </div>
      </div>
    </div>
  );
}
